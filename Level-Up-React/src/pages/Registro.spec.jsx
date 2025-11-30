// src/pages/Registro.spec.jsx
import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Registro from "./Registro"

// 🔧 Mock de firebase/config (db)
jest.mock("../firebase/config", () => ({
  db: {}
}))

// 🔧 Mock de firebase/firestore
const mockAddDoc = jest.fn()
const mockCollection = jest.fn()

jest.mock("firebase/firestore", () => ({
  collection: (...args) => mockCollection(...args),
  addDoc: (...args) => mockAddDoc(...args)
}))

// 🧩 Función auxiliar para llenar el formulario rápido
const fillForm = (overrides = {}) => {
  const values = {
    rut: "11.111.111-1",
    nombreCompleto: "Juan Pérez",
    email: "juan@example.com",
    telefono: "987654321",
    password: "clave123",
    repetirPassword: "clave123",
    ...overrides
  }

  fireEvent.change(screen.getByPlaceholderText(/rut/i), {
    target: { value: values.rut }
  })
  fireEvent.change(screen.getByPlaceholderText(/nombre completo/i), {
    target: { value: values.nombreCompleto }
  })
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: values.email }
  })
  fireEvent.change(screen.getByPlaceholderText(/teléfono/i), {
    target: { value: values.telefono }
  })
  fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
    target: { value: values.password }
  })
  fireEvent.change(screen.getByPlaceholderText("Repetir contraseña"), {
    target: { value: values.repetirPassword }
  })

  return values
}

beforeEach(() => {
  jest.clearAllMocks()
})

// 1️⃣ Render básico
test("renderiza el título y el botón de registro", () => {
  render(<Registro />)

  // Verificamos título y botón principal
  expect(screen.getByText(/registro de usuario/i)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /registrarme/i })).toBeInTheDocument()
})

// 2️⃣ No muestra mensajes al inicio
test("no muestra mensajes de éxito ni error al iniciar", () => {
  render(<Registro />)

  // No debería haber mensajes todavía
  expect(
    screen.queryByText(/usuario registrado correctamente/i)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText(/ocurrió un error al registrar el usuario/i)
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText(/las contraseñas no coinciden/i)
  ).not.toBeInTheDocument()
})

// 3️⃣ Error cuando las contraseñas no coinciden
test("muestra error si las contraseñas no coinciden y no llama a addDoc", async () => {
  render(<Registro />)

  fillForm({ repetirPassword: "otra-clave" }) // contraseñas distintas

  fireEvent.submit(screen.getByRole("button", { name: /registrarme/i }))

  expect(
    await screen.findByText(/las contraseñas no coinciden/i)
  ).toBeInTheDocument()
  expect(mockAddDoc).not.toHaveBeenCalled()
})

// 4️⃣ Llama a addDoc con los datos correctos en un registro válido
test("envía los datos correctos a Firestore cuando el formulario es válido", async () => {
  mockAddDoc.mockResolvedValueOnce({ id: "abc123" })

  render(<Registro />)

  const values = fillForm()

  fireEvent.submit(screen.getByRole("button", { name: /registrarme/i }))

  await waitFor(() => {
    expect(mockAddDoc).toHaveBeenCalledTimes(1)
  })

  // Verificamos que se haya llamado con la colección "usuarios"
  expect(mockCollection).toHaveBeenCalledWith({}, "usuarios")

  const [, userData] = mockAddDoc.mock.calls[0]

  // Verificamos algunos campos clave
  expect(userData.rut).toBe(values.rut)
  expect(userData.nombreCompleto).toBe(values.nombreCompleto)
  expect(userData.email).toBe(values.email)
  expect(userData.telefono).toBe(values.telefono)
  expect(userData.password).toBe(values.password)
})

// 5️⃣ Muestra mensaje de éxito al registrarse correctamente
test("muestra mensaje de éxito cuando el registro se completa", async () => {
  mockAddDoc.mockResolvedValueOnce({ id: "id-usuario-1" })

  render(<Registro />)

  fillForm()
  fireEvent.submit(screen.getByRole("button", { name: /registrarme/i }))

  expect(
    await screen.findByText(/usuario registrado correctamente/i)
  ).toBeInTheDocument()
})

// 6️⃣ Limpia el formulario después de un registro exitoso
test("limpia los campos después de un registro exitoso", async () => {
  mockAddDoc.mockResolvedValueOnce({ id: "id-usuario-2" })

  render(<Registro />)

  fillForm()
  fireEvent.submit(screen.getByRole("button", { name: /registrarme/i }))

  await screen.findByText(/usuario registrado correctamente/i)

  // Los inputs deberían quedar vacíos
  expect(screen.getByPlaceholderText(/rut/i)).toHaveValue("")
  expect(screen.getByPlaceholderText(/nombre completo/i)).toHaveValue("")
  expect(screen.getByPlaceholderText(/email/i)).toHaveValue("")
  expect(screen.getByPlaceholderText(/teléfono/i)).toHaveValue("")
})

// 7️⃣ Muestra mensaje de error si addDoc lanza una excepción
test("muestra mensaje de error cuando addDoc falla", async () => {
  mockAddDoc.mockRejectedValueOnce(new Error("Falla en Firestore"))

  render(<Registro />)

  fillForm()
  fireEvent.submit(screen.getByRole("button", { name: /registrarme/i }))

  expect(
    await screen.findByText(/ocurrió un error al registrar el usuario/i)
  ).toBeInTheDocument()
})

// 8️⃣ Limpia el mensaje de error al intentar registrar de nuevo
test("limpia el mensaje de error en un nuevo intento de registro", async () => {
  // Primer intento: error
  mockAddDoc.mockRejectedValueOnce(new Error("Error inicial"))
  // Segundo intento: éxito
  mockAddDoc.mockResolvedValueOnce({ id: "id-ok" })

  render(<Registro />)

  fillForm()
  fireEvent.submit(screen.getByRole("button", { name: /registrarme/i }))

  expect(
    await screen.findByText(/ocurrió un error al registrar el usuario/i)
  ).toBeInTheDocument()

  // Segundo intento
  fillForm()
  fireEvent.submit(screen.getByRole("button", { name: /registrarme/i }))

  // Ya no debería mostrarse el error
  await waitFor(() => {
    expect(
      screen.queryByText(/ocurrió un error al registrar el usuario/i)
    ).not.toBeInTheDocument()
  })
})
