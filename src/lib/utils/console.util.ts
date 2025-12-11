let bannerShown = false

const consoleScreen = (port: number, environment: string) => {
  if (bannerShown) {
    return
  } else {
    bannerShown = true

    console.clear()
    console.log(`
░█▀▀░█░█░█▀█░█▀▄░█▀▀░█▀▀░█▀▀░░░▀█▀░█▀▀░░░█░█░░░░▀█░
░█▀▀░▄▀▄░█▀▀░█▀▄░█▀▀░▀▀█░▀▀█░░░░█░░▀▀█░░░▀▄▀░░░░░█░
░▀▀▀░▀░▀░▀░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░░░░▀░░▀▀▀░░░░▀░░▀░░▀▀▀
    `)
    console.log(`⣏⡱ ⡀⢀   ⡇  ⢀⡀ ⢀⡀ ⣀⣀ ⢀⣀ ⣀⡀ ⣀⡀
⠧⠜ ⣑⡺   ⠧⠤ ⠣⠭ ⠣⠜ ⠴⠥ ⠣⠼ ⠇⠸ ⠇⠸`)
    console.log('================================================')
    console.log(`Environment: ${environment.toUpperCase()}`)
    console.log(`Server is live at http://localhost:${port}`)
    console.log('================================================')
  }
}

export default consoleScreen
