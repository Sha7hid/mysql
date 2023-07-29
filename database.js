import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
user:process.env.MYSQL_USER,
password:process.env.MYSQL_PASSWORD,
database:process.env.MYSQL_DATABASE
}).promise()

 export async function getNotes(){
    const [rows] = await pool.query("select * from notes")
return rows
}

export async function getNote(id){
    const [rows] = await pool.query(`
    select *
    from notes
    where id=?
    `,[id])
    return rows[0]
}

export async function createNote(title, contents){
    const result = await pool.query(`
    insert into notes (title,contents)
    values(?,?)
    `,[title,contents])
    const id = result[0].insertId
  return getNote(id)
}
export async function UpdateNote(id, title, contents) {
    const result = await pool.query(
      `
      UPDATE notes SET title = ?, contents = ? WHERE id = ?;
      `,
      [title, contents, id]
    );
    return getNote(id)
    
  }
  export async function DeleteNote(id){
    const result = await pool.query(`
    delete from notes where id=?
    `,[id])
  return result[0]
}
  
// const test = await createNote('test','test')
// console.log(test)
// const note = await getNote(1)
// console.log(note)
