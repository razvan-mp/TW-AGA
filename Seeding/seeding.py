import mysql.connector
import pymysql
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
    cursor.execute("CREATE TABLE IF NOT EXISTS Awards.ScreenActorGuildAwardsStaging(Year VARCHAR(255),Category VARCHAR(255),Name VARCHAR(255), Show_Name VARCHAR(255),Won VARCHAR(255))")
    print("Table created syccessfully")
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()


# Bulk Insert real data
try:
    connection = pymysql.connect(
    host = "localhost",
    user = "admin",
    passwd = "admin",
    database = "Awards",
    autocommit = True,
    local_infile = 1
    )
    cursor = connection.cursor()

    #  Verify if we have to load the data
    cursor.execute('SELECT COUNT(1) FROM Awards.ScreenActorGuildAwards')
    rows = cursor.fetchall()

    if int(rows[0][0]) == 0:
        cursor.execute("LOAD DATA LOCAL INFILE 'screen_actor_guild_awards.csv' INTO TABLE Awards.ScreenActorGuildAwardsStaging FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'")
        cursor.execute("INSERT INTO Awards.ScreenActorGuildAwards(Year, Category, Name, Show_Name, Won) SELECT Year, Category, Name, Show_Name, Won FROM Awards.ScreenActorGuildAwardsStaging")
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