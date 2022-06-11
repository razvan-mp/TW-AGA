# Install cx-Oracle:
# 
# py -m pip install cx-Oracle

import mysql.connector
import pandas as pd

connection = mysql.connector.connect(
    host = "localhost",
    user = "admin",
    passwd = "admin"
)
cursor = connection.cursor()

# Create the database

try:
    cursor.execute("CREATE DATABASE IF NOT EXISTS Awards")
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()

# Create the table
try:
    connection = mysql.connector.connect(
    host = "localhost",
    user = "admin",
    passwd = "admin",
    database = "Awards"
    )
    cursor = connection.cursor()

    cursor.execute("CREATE TABLE IF NOT EXISTS Awards.ScreenActorGuildAwards(Id INT NOT NULL AUTO_INCREMENT,Year VARCHAR(255),Category VARCHAR(255),Name VARCHAR(255), Show_Name VARCHAR(255),Won VARCHAR(255), PRIMARY KEY(Id))")
    print("Table created syccessfully")
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()


# Insert real data
try:
    connection = mysql.connector.connect(
    host = "localhost",
    user = "admin",
    passwd = "admin",
    database = "Awards"
    )
    cursor = connection.cursor()

    #  Verify if we have to load the data
    cursor.execute('SELECT COUNT(1) FROM Awards.ScreenActorGuildAwards')
    rows = cursor.fetchall()

    if int(rows[0][0]) == 0:
        df = pd.read_csv('screen_actor_guild_awards.csv')
        # TODO Bulk insert
        for index, row in df.iterrows():
            if ("Annual" in str(row['year'])) == True:
                msg = "INSERT INTO Awards.ScreenActorGuildAwards VALUES(" + str(index + 1) + ", \'" + str(row['year']).replace("'", " ") + "\',\'" + str(row['category']).replace("'", " ")  + "\',\'" + str(row['full_name']).replace("'", " ")  + "\',\'" + str(row['show']).replace("'", " ")  +  "\',\'" + str(row['won']).replace("'", " ")  + '\')'
                cursor.execute(msg)
                connection.commit()
        print("Data inserted successfully")

finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()


#See the data
try:
    connection = mysql.connector.connect(
    host = "localhost",
    user = "admin",
    passwd = "admin",
    database = "Awards"
    )
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM Awards.ScreenActorGuildAwards')

    rows = cursor.fetchall()
    print(rows)
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()