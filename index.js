const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer((req, res) => {
    const params = url.parse(req.url, true).query
    const archivo = params.archivo
    const nombre = params.nombre
    const nuevoNombre = params.nuevoNombre
    const contenido = params.contenido

    if(req.url.includes('/crear')) {
        fs.writeFile(archivo, contenido, () => {
            res.write('Archivo creado con exito')
            res.end()
        })
    }

    if(req.url.includes('/leer')) {
        fs.readFile(archivo, (err, data) => {
            if(err) {
                res.write(`Error: El archivo que buscas no existe`)
                res.end()
            }else {
            res.write(data)
            res.end()
            }
        })
    }

    if(req.url.includes('/renombrar')) {
        fs.rename(nombre, nuevoNombre, (err) => {
            if(err) {
                res.write(`Error: El nombre del archivo no existe por lo que no puedes renombrarlo`)
                res.end()
            }else {
            res.write(`Archivo ${nombre} renombrado por ${nuevoNombre}`)
            res.end()
            }
        })
    }

    if(req.url.includes('/eliminar')) {

        fs.unlink(archivo, (err) => {
            if(err) {
                res.write(`Error: El archivo no puede ser eliminado ya que no existe`)
                res.end()
            }else {
                res.write(`El archivo ${archivo} se ha eliminado correctamente`)
                res.end()
            }
        })           
    }
})

.listen(8080, () => {
    console.log('Server ON')
})