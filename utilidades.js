const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control,.form-select,.form-check-input').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('btnSave').value = 'Guardar'
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)

    input.classList.remove('is-invalid')

    if (input.value.trim() === '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid')
        div.innerHTML = ''

        if (id === 'correo') {
            if (!validarCorreo(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        } else if (id === 'precio' || id === 'stock') {
            if (parseInt(input.value) < 1) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El valor debe ser mayor o igual a 1</span>'
            }

        } else if (id === 'fecha') {
            const minima = new Date()
            minima.setDate(minima.getDate() - 5)
            const selecionafecha = new Date(input.value)
            if (selecionafecha < minima) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El ingreso debe haber ocurrido en los últimos 5 días</span>'
            }
        }
    }

    if (id === 'categoria') {
        validaRadio(input.name)
    }
}

const validarCorreo = (correo) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    return formato.test(correo)
}

const actualizarCategoria = (radioButton) => {
    categoriaSeleccionada = tipoProductoMap[radioButton.id]
}

const tipoProductoMap = {
    electronica: 'Electrónica',
    ropa: 'Ropa',
    alimentos: 'Alimentos'
}

const validaRadio = (name) => {
    const radio = document.querySelector('input[name="' + name + '"]:checked')
    const div = document.getElementById('e-' + name)
    const all = document.querySelectorAll('input[name="' + name + '"]')

    if (!radio) {
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
        all.forEach(item => {
            item.classList.add('is-invalid')
        })
    } else {
        div.innerHTML = ''
        all.forEach(item => {
            item.classList.remove('is-invalid')
            item.classList.add('is-valid')
        })
    }
}



