<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})

const subtitles = ref('')
let mediaRecorder
let recordedChunks = []

const videoSrc = ref()
/**
 *
 */
const searchReddit = async () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const recordedDiv = document.getElementById('recordedDiv')
  const context = canvas.getContext('2d')

  if (!canvas || !recordedDiv || !context) return

  canvas.width = recordedDiv.offsetWidth
  canvas.height = recordedDiv.offsetHeight

  const utterance = new SpeechSynthesisUtterance()
  const stream = canvas.captureStream()

  mediaRecorder = new MediaRecorder(stream)

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data)
    }
  }

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    recordedChunks = []
    const videoUrl = URL.createObjectURL(blob)
    console.log(videoUrl)
  }

  const text = 'Hello, this is an example'

  // Set the text that you want to convert to speech
  utterance.text = text
  //utterance.voice = speechSynthesis.getVoices()[7]
  const voices = speechSynthesis.getVoices()

  const maleVoice = voices.find(function (voice) {
    console.log(voice.name)
    return voice.name === 'Arthur'
  })
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawWindow(
    window,
    0,
    0,
    recordedDiv.offsetWidth,
    recordedDiv.offsetHeight,
    'rgba(0, 0, 0, 0)'
  )

  utterance.voice = maleVoice!

  // Optional: Set other properties like voice, rate, pitch, etc.
  // utterance.voice = speechSynthesis.getVoices()[0]; // Set a specific voice
  // utterance.rate = 1.0; // Speed of speech (0.1 to 10)
  // utterance.pitch = 1.0; // Pitch of speech (0 to 2)

  // Create a function to display subtitles on the video

  utterance.onboundary = function (event) {
    if (event.name === 'word') {
      var spokenWord = text.slice(
        event.charIndex,
        event.charIndex + event.charLength
      )

      subtitles.value = spokenWord
      //console.log('Current word:', spokenWord)
    }
  }

  utterance.onstart = () => {
    mediaRecorder.start()

    const startTime = 1

    // Set the initial time when the video is loaded
    videoSrc.value.currentTime = startTime
    videoSrc.value.play()
  }
  utterance.onend = () => {
    videoSrc.value.pause()
    mediaRecorder.stop()
  }

  // Call the Speech Synthesis API to speak the text
  speechSynthesis.speak(utterance)

  return
  const res = await fetch(
    'https://old.reddit.com/r/relationship_advice/comments/1ch38uf/update_my_wife_32f_just_walked_out_on_me_36m_with/'
  )
  const html = await res.text()

  console.log(html)
}

onMounted(() => {
  const startTime = 1

  // Set the initial time when the video is loaded
  videoSrc.value.currentTime = startTime
})
</script>

<template>
  <h1 class="text-2xl font-bold">AI</h1>

  <div class="grid grid-cols-2 gap-4">
    <Card class="p-6 space-y-6">
      <div>
        <Label>URL</Label>
        <Input placeholder="Text" />
      </div>

      <div>
        <Button @click.prevent="searchReddit">Submit</Button>
      </div>

      <div>
        <Label>Title</Label>
        <Input placeholder="Text" />
      </div>

      <div>
        <Label>Text</Label>
        <Textarea placeholder="Text" rows="10" />
      </div>

      <div>
        <Label>Gender</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="male"> Male </SelectItem>
              <SelectItem value="female"> Female </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Folder Name</Label>
        <Input placeholder="Text" />
      </div>

      <div class="text-end">
        <Button @click.prevent="">Submit</Button>
      </div>
    </Card>

    <Card>
      <div class="relative vertical-frame" id="recordedDiv">
        <!-- <video id="myVideo" class="relative" ref="videoSrc">
          <source src="/minecraft.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> -->

        <div
          class="absolute top-0 w-full flex items-center justify-center h-full"
        >
          <h1 class="text-4xl text-center text-yellow-300">
            {{ subtitles }}
          </h1>
        </div>
      </div>
    </Card>
  </div>
  <canvas id="canvas" style="display: none"></canvas>
</template>

<style scoped>
.vertical-frame {
  width: 360px; /* Desired width of the vertical frame */
  height: 640px; /* Desired height of the vertical frame */
  overflow: hidden;
  position: relative;
}

.vertical-frame video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: none;
  max-height: none;
  width: auto;
  height: 100%;
}
</style>
