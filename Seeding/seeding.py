# Install cx-Oracle:
# 
# py -m pip install cx-Oracle

import cx_Oracle
import pandas as pd


# Create the table
try:
    connection = cx_Oracle.connect('STUDENT/PASSWORD')
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE Student.ScreenActorGuildAwards(Id INTEGER,Year VARCHAR2(255),Category VARCHAR2(255),Name VARCHAR2(255),Show VARCHAR2(255),Won VARCHAR2(255))")

    print("Table created syccessfully")
except cx_Oracle.DatabaseError as exception:
    print("Error here", exception)
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()


#Insert real data
try:
    connection = cx_Oracle.connect('STUDENT/PASSWORD')
    cursor = connection.cursor()

    #  Verify if we have to load the data
    cursor.execute('SELECT COUNT(*) FROM STUDENT.ScreenActorGuildAwards')
    rows = cursor.fetchall()

    if int(rows[0][0]) == 0:
        df = pd.read_csv('screen_actor_guild_awards.csv')
        for index, row in df.iterrows():
            if ("Annual" in str(row['year'])) == True:
                msg = "INSERT INTO ScreenActorGuildAwards VALUES(" + str(index + 1) + ", \'" + str(row['year']).replace("'", " ") + "\',\'" + str(row['category']).replace("'", " ")  + "\',\'" + str(row['full_name']).replace("'", " ")  + "\',\'" + str(row['show']).replace("'", " ")  +  "\',\'" + str(row['won']).replace("'", " ")  + '\')'
                cursor.execute(msg)
                connection.commit()
        print("Data inserted successfully")

except cx_Oracle.DatabaseError as exception:
    print("Error here", exception)
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()


#See the data
try:
    connection = cx_Oracle.connect('STUDENT/PASSWORD')
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM STUDENT.ScreenActorGuildAwards')

    rows = cursor.fetchall()
    print(rows)
except cx_Oracle.DatabaseError as exception:
    print("Error here", exception)
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()