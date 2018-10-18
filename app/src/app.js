const IPFS = require('ipfs')

// const ipfs = new IPFS({
//     EXPERIMENTAL: {
//         pubsub: true
//     }
// })
// ipfs.once('ready', () => ipfs.id((err, info) => {
//     if (err)
//         throw err
//     console.log("IPFS node ID: " + info.id)    

// }))
const node = new IPFS()
node.on('ready', async () => {
    const version = await node.version()

    console.log('Version:', version.version)
    
    document.getElementById('input-file').addEventListener('change', getFile)
    document.getElementById('uploadButton').addEventListener('click', async function(){
        let fileName = document.getElementById('file').value
        let fileContent = document.getElementById('content-target').value

        var t_before = new Date().getTime();
        
        // Add file
        const filesAdded = await node.files.add({
        path: fileName,
        content: Buffer.from(fileContent)
        })

        var t_after = new Date().getTime();
        document.getElementById("uploadTime").innerHTML = t_after-t_before + "  miliseconds";
        document.getElementById('upload').innerHTML = filesAdded[0].hash
    })

    document.getElementById('downloadButton').addEventListener('click', async function(){
        t_before = new Date().getTime();
        let downloadHash = document.getElementById('downloadFile').value;
        // Get File
        const fileBuffer = await node.files.cat(downloadHash)

        t_after = new Date().getTime();

        document.getElementById("downloadTime").innerHTML = t_after-t_before + "  miliseconds";
        document.getElementById('download').innerHTML = fileBuffer.toString()
    })
})

function getFile(event) {
    const input = event.target
    
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(
      document.getElementById('content-target'),
      input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
  	target.value = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

