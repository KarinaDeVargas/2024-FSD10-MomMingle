import mysql from "mysql"

export const db = mysql.createConnection({
  host:"database-mommingle.cte2k484o8kc.us-east-1.rds.amazonaws.com",
  user:"mommingle",
  password: "mommingle",
  database:"mommingle"
})