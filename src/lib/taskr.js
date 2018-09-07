class Taskr {
  constructor(tasks, options) {
    this.tasks = tasks
  }
  run() {
    const promises = this.tasks.map(i => {
      console.log(i instanceof Taskr)
      if (i.task instanceof Taskr) return i.task.run()
      return i.task()
    })
    Promise.all(promises)

    return Promise.resolve().then
  }
}

module.exports = Taskr
