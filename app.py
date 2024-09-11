from flask import Flask, render_template, request, url_for, flash, session, redirect,jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'aditya'

# MySQL configurations
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'jobsy_users'

mysql = MySQL(app)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/logined")
def logined():
    if 'email' in session:
        return render_template('index_logined.html', name=session['fname'])
    else:
        return redirect(url_for('home'))

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        print(f"User fetched from database: {user}") # Debugging
        if user and 'PASSWORD' in user and check_password_hash(user['PASSWORD'], password):
            session['email'] = email
            session['fname'] = user['fname']
            session['lname'] = user['lname']
            return render_template('index_logined.html', name=session['fname']+" "+session['lname'])
        else:
            return render_template('login.html', error="Invalid email or password")
    else:
        return render_template('login.html')

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        fname = request.form['fname']
        lname = request.form['lname']
        email = request.form['email']
        password = request.form['password']
        dateofbirth = request.form['dob']
        gender = request.form['gender']
        hashed_password = generate_password_hash(password)
        cur = mysql.connection.cursor()
        try:
            cur.execute("INSERT INTO users (fname, lname, email, password, DOB, gender) VALUES (%s, %s, %s, %s, %s, %s)", 
                        (fname, lname, email, hashed_password, dateofbirth, gender))
            mysql.connection.commit()
            flash('You have successfully signed up!', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            mysql.connection.rollback()
            flash(f'Error: {str(e)}', 'danger')
        finally:
            cur.close()
    return render_template('signup.html')

@app.route("/featured")
def featured():
    if 'email' in session:
        return render_template('featured.html', name=session['fname'])
    else:
        flash("Please login first", 'danger')
        return redirect(url_for('home'))
    
@app.route("/logout")
def logout():
    session.clear()
    flash("You have been logged out.", "success")
    return redirect(url_for('home'))

@app.route("/api/jobs", methods=['GET'])
def get_jobs():
    search_term = request.args.get('search', '').lower()
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    if search_term:
        query = """
        SELECT title, company, location, salary 
        FROM jobs 
        WHERE LOWER(title) LIKE %s OR LOWER(company) LIKE %s OR LOWER(location) LIKE %s
        """
        like_term = f"%{search_term}%"
        cur.execute(query, (like_term, like_term, like_term))
    else:
        cur.execute("SELECT title, company, location, salary FROM jobs")
    
    jobs = cur.fetchall()
    cur.close()
    return jsonify(jobs)
        
if __name__ == "__main__":
    app.run(debug=True)