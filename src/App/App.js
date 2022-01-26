export default {
  data() {
    return {
      setTones: [],
      userSetTones: [],
      speed: 500,
      intervalId: null,

      level: [ 
        { nameLevel: 'easy', speed: 1500 },
        { nameLevel: 'normal', speed: 1000 },
        { nameLevel: 'hard', speed: 400 }
      ],

      showLoss: false,
      aGreen: false,
      aRed: false,
      aBlue: false,
      aYellow: false,
      playingSetTones: false,
    };
  },
  methods: {
    starGame() {
      this.newGame()
      this.newRound()
      console.log("Array Color", this.setTones)
    },
    addTone() {
      this.setTones.push(this.randomTone())
    },
    randomTone() {
      return Math.floor(Math.random() * 4) + 1
    },
    showSetTones() {
      let numberTone = 0
      this.intervalId = setInterval(() => {
        this.showTone(this.setTones[numberTone])
        setTimeout(this.clearActive, this.speed/2)
        if(numberTone >= this.setTones.length) {
          this.playingSetTones = false
          clearInterval(this.intervalId)
        }
        numberTone++
      }, this.speed)
    },
    showTone(tone) {
      switch (tone) {
        case 1:
          this.$refs.sound1.pause()
          this.$refs.sound1.currentTime = 0
          this.$refs.sound1.play()
          this.aGreen = true
          break;
        case 2:
          this.$refs.sound2.pause()
          this.$refs.sound2.currentTime = 0
          this.$refs.sound2.play()
          this.aRed = true
          break;
        case 3:
          this.$refs.sound4.pause()
          this.$refs.sound4.currentTime = 0
          this.$refs.sound4.play()
          this.aBlue = true
          break;
        case 4:
          this.$refs.sound3.pause()
          this.$refs.sound3.currentTime = 0
          this.$refs.sound3.play()
          this.aYellow = true
          break;
      }
    },
    clearActive() {
      this.aGreen = false
      this.aRed = false
      this.aYellow = false
      this.aBlue = false
    },
    intutUserSetTones(tone) {
      if(!this.playingSetTones && !this.showLoss) {
        this.showTone(tone)
        setTimeout(this.clearActive, 100)
        this.userSetTones.push(tone)
        let countUserTones = this.userSetTones.length - 1
        if(this.userSetTones[countUserTones] != this.setTones[countUserTones]) {
          this.showLoss = true
        }
        else if(countUserTones + 1 == this.setTones.length) {
          this.newRound()
        }
        console.log('My tones', this.userSetTones)
      }
    },
    newGame() {
      clearInterval(this.intervalId)
      this.clearActive()
      this.setTones = []
      this.userSetTones = []
      this.showLoss = false
      this.playingSetTones = false
    },
    newRound() {
      this.userSetTones = []
      this.playingSetTones = true
      this.addTone()
      this.showSetTones()
    }
  },
};
