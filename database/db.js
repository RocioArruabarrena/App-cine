import * as crypto from "expo-crypto"
import * as SQLite from "expo-sqlite"

let db

export const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync("cineapp.db")

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      nombre TEXT,
      rol TEXT
    );
  `)

  const admin = await db.getFirstAsync("SELECT * FROM users WHERE username='admin'")
  if (!admin) {
    const hash = await hashPassword("admin1234")
    await db.runAsync("INSERT INTO users (username, password, nombre, rol) VALUES (?, ?, ?, ?)", [
      "admin",
      hash,
      "Administrador",
      "admin"
    ])
  }
}

export const hashPassword = async (password) =>
  await crypto.digestStringAsync(crypto.CryptoDigestAlgorithm.SHA256, password)

export const loginUser = async (username, password) => {
  const hash = await hashPassword(password)
  const user = await db.getFirstAsync("SELECT * FROM users WHERE username=? AND password=?", [username, hash])
  return user || null
}

export const getUsers = async () => await db.getAllAsync("SELECT * FROM users")

export const addUser = async (username, password, nombre, rol = "user") => {
  const hash = await hashPassword(password)
  await db.runAsync("INSERT INTO users (username, password, nombre, rol) VALUES (?, ?, ?, ?)", [
    username,
    hash,
    nombre,
    rol
  ])
}

export const updateUser = async (id, username, password, nombre, rol) => {
  const hash = password ? await hashPassword(password) : null
  if (hash) {
    await db.runAsync("UPDATE users SET username=?, password=?, nombre=?, rol=? WHERE id=?", [
      username,
      hash,
      nombre,
      rol,
      id
    ])
  } else {
    await db.runAsync("UPDATE users SET username=?, nombre=?, rol=? WHERE id=?", [username, nombre, rol, id])
  }
}

export const deleteUser = async (id) => {
  await db.runAsync("DELETE FROM users WHERE id=?", [id])
}
