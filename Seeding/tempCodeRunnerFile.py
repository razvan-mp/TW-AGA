try:
#     #  Verify if we have to load the data
#     cursor.execute('SELECT COUNT(1) FROM Awards.ScreenActorGuildAwards')
#     rows = cursor.fetchall()

#     if int(rows[0][0]) == 0:
#         cursor.execute("LOAD DATA LOCAL INFILE 'screen_actor_guild_awards.csv' INTO TABLE Awards.ScreenActorGuildAwardsStaging FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'")
#         cursor.execute("INSERT INTO Awards.ScreenActorGuildAwards(Year, Category, Name, Show_Name, Won) SELECT Year, Category, Name, Show_Name, Won FROM Awards.ScreenActorGuildAwardsStaging")
#         print("Data inserted successfully")

# finally:
#     if cursor:
#         cursor.close()
#     if connection:
#         connection.close()
