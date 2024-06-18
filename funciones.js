import { getData, getDocumento, remove, save, update } from './firestore.js'

let currentId = null

document.getElementById('btnSave').addEventListener('click', async (event) => {
    event.preventDefault()

    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })

    validaRadio('categoria')

    if (document.querySelectorAll('.is-invalid').length === 0) {
        const emp = {
            nombre: document.getElementById('nombre').value,
            fecha: document.getElementById('fecha').value,
            categoria: document.querySelector('input[name="categoria"]:checked').value,
            precio: document.getElementById('precio').value,
            stock: document.getElementById('stock').value,
            proveedor: document.getElementById('proveedor').value,
            correo: document.getElementById('correo').value,
            code: document.getElementById('code').value,
        }

        const datos = await getData()
        let codigoExiste = false

        datos.forEach(doc => {
            const item = doc.data()
            if (item.code === emp.code && doc.id !== currentId) {
                codigoExiste = true
            }
        })

        if (codigoExiste) {
            Swal.fire('Error', 'El código del producto ya existe', 'error')
        } else {
            if (currentId === null) {
                await save(emp)
                Swal.fire('Guardado', '', 'success')
            } else {
                await update(currentId, emp)
                Swal.fire('Actualizado', '', 'success')
            }
            currentId = null
            limpiar()
            loadData()
        }
    }
})

const loadData = async () => {
    const datos = await getData()
    let tabla = ''

    datos.forEach((emp) => {
        const item = emp.data()
        tabla += `<tr>
            <td>${item.nombre}</td>
            <td>${item.fecha}</td>
            <td>${tipoProductoMap[item.categoria]}</td>
            <td>${item.precio}</td>
            <td>${item.stock}</td>
            <td>${item.proveedor}</td>
            <td>${item.correo}</td>
            <td>${item.code}</td>
            <td nowrap>
                <button class="btn btn-warning" id="edit-${emp.id}">Editar</button>
                <button class="btn btn-danger" id="delete-${emp.id}">Eliminar</button>
            </td>
        </tr>`
    })

    document.getElementById('contenido').innerHTML = tabla

    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.id.replace('delete-', '')
            Swal.fire({
                title: "¿Estás seguro de eliminar el registro?",
                text: "No podrás revertir los cambios",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Eliminar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await remove(id)
                    Swal.fire('Eliminado!', 'Su registro ha sido eliminado', 'success')
                    loadData()
                }
            })
        })
    })

    document.querySelectorAll('.btn-warning').forEach(btn => {
        btn.addEventListener('click', async () => {
            const idDoc = btn.id.replace('edit-', '')
            const doc = await getDocumento(idDoc)
            const emp = doc.data()

            document.getElementById('nombre').value = emp.nombre
            document.getElementById('fecha').value = emp.fecha
            document.getElementById('precio').value = emp.precio
            document.getElementById('stock').value = emp.stock
            document.getElementById('proveedor').value = emp.proveedor
            document.getElementById('correo').value = emp.correo
            document.getElementById('code').value = emp.code

            document.querySelectorAll('input[name="categoria"]').forEach(radio => {
                if (radio.value === emp.categoria) {
                    radio.checked = true
                } else {
                    radio.checked = false
                }
            })

            currentId = doc.id 
            document.getElementById('btnSave').value = 'Editar' 
        })
    })
}

window.addEventListener('DOMContentLoaded', loadData)

const tipoProductoMap = {
    electronica: 'Electrónica',
    ropa: 'Ropa',
    alimentos: 'Alimentos'
}
