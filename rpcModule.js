const rpc = require('discord-rpc')
const rpcClient = new rpc.Client({
    transport: 'ipc'
})

class RPC {
    run() {
        rpcClient.on('ready', () => {
            rpcClient.request('SET_ACTIVITY', {
                pid: process.pid,
                activity: {
                    details: "flying",
                    state: 'youtube.com/d1ekaue',
                    assets: {
                        large_image: "logo",
                        large_text: "Midnight"
                    },
                    buttons: [{
                        label: "Download",
                        url: "https://www.youtube.com/d1ekaue"
                    }]
                }
            })
        })

        rpcClient.login({
            clientId: '973699654984282133'
        }).catch
    }
}

module.exports = RPC