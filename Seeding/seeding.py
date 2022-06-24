import psycopg2
import pandas as pd

connection = psycopg2.connect(
    host = "ec2-54-228-32-29.eu-west-1.compute.amazonaws.com",
    user = "ysdxpuushergpw",
    password = "90aac33ad610e22ef9723399d1107258db5948d848ed4d5bb3ef60a1211a9d3a",
    database = "d14p9i6cr53t33",
    port = "5432"
)
cursor = connection.cursor()

# Create the table
try:
    cursor.execute("CREATE TABLE IF NOT EXISTS ScreenActorGuildAwards(Id SERIAL PRIMARY KEY,Year VARCHAR(255),Category VARCHAR(255),Name VARCHAR(255), Show_Name VARCHAR(255),Won VARCHAR(255))")
    cursor.execute("CREATE TABLE IF NOT EXISTS ScreenActorGuildAwardsStaging(Year VARCHAR(255),Category VARCHAR(255),Name VARCHAR(255), Show_Name VARCHAR(255),Won VARCHAR(255))")
    cursor.execute('commit;')
    print("Table created syccessfully")
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()

# Bulk Insert real data
try:
    #  Verify if we have to load the data
    connection = psycopg2.connect(
    host = "ec2-54-228-32-29.eu-west-1.compute.amazonaws.com",
    user = "ysdxpuushergpw",
    password = "90aac33ad610e22ef9723399d1107258db5948d848ed4d5bb3ef60a1211a9d3a",
    database = "d14p9i6cr53t33",
    port = "5432"
    )
    cursor = connection.cursor()
    cursor.execute('SELECT COUNT(1) FROM ScreenActorGuildAwards')
    rows = cursor.fetchall()

    if int(rows[0][0]) == 0:
        file = open('screen_actor_guild_awards.csv', 'r', encoding='utf-8')
        cursor.copy_expert("copy {} from STDIN CSV HEADER QUOTE '\"'".format('ScreenActorGuildAwardsStaging'), file)
        cursor.execute('commit;')
        # cursor.execute("LOAD DATA LOCAL INFILE 'screen_actor_guild_awards.csv' INTO TABLE Awards.ScreenActorGuildAwardsStaging FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'")
        cursor.execute("INSERT INTO ScreenActorGuildAwards(Year, Category, Name, Show_Name, Won) SELECT Year, Category, Name, Show_Name, Won FROM ScreenActorGuildAwardsStaging")
        cursor.execute('commit;')
        print("Data inserted successfully")

finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()

#See the data
try:
    connection = psycopg2.connect(
    host = "ec2-54-228-32-29.eu-west-1.compute.amazonaws.com",
    user = "ysdxpuushergpw",
    password = "90aac33ad610e22ef9723399d1107258db5948d848ed4d5bb3ef60a1211a9d3a",
    database = "d14p9i6cr53t33",
    port = "5432"
    )
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM ScreenActorGuildAwards')

    rows = cursor.fetchall()
    print(rows)
finally:
    if cursor:
        cursor.close()
    if connection:
        connection.close()