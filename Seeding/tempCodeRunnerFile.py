try:
    connection = cx_Oracle.connect('STUDENT/PASSWORD')
    cursor = connection.cursor()

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