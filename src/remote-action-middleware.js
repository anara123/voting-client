const middleware = socket => state => next => action => {

        if (action.meta && action.meta.remote) {
          console.log('remote action######', action)
          socket.emit('action', action)
        }

        next(action)
}

export default middleware
