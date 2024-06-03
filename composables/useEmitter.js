import mitt from 'mitt'

const emitter = mitt()

const useEmitter = () => {
  return {
    $on: emitter.on,
    $emit: emitter.emit
  }
}

export default useEmitter