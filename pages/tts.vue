<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})

const title = ref('Hello, this is a test')
const subtitles = ref('')
const videoSrc = ref()
const canvasRef = ref()
let combinedStream
let mediaRecorder: MediaRecorder
let recordedChunks: Blob[] = []

/**
 *
 */
const mediaRec = (rec: MediaRecorder) => {
  // On stop, create a Blob from the recorded chunks and create a download link
  rec.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)

    window.open(url, '_blank')

    return
  }

  // On data available, push the data to recordedChunks
  rec.ondataavailable = (event) => {
    //if (event.data.size > 0) {
    recordedChunks.push(event.data)
    // }
  }

  rec.start()
}

/**
 *
 */
const searchReddit = async () => {
  const canvas = canvasRef.value
  const recordedDiv = document.getElementById('recordedDiv')

  if (!canvas || !recordedDiv) return

  const startTime = 2
  videoSrc.value.currentTime = startTime
  await videoSrc.value.play()

  canvas.width = recordedDiv.offsetWidth
  canvas.height = recordedDiv.offsetHeight
  const ctx = canvas.getContext('2d')

  const videoStream = canvas.captureStream()

  const utterance = new SpeechSynthesisUtterance()
  const audioContext = new window.AudioContext()
  const destination = audioContext.createMediaStreamDestination()
  const source = audioContext.createMediaStreamSource(destination.stream)

  source.connect(destination)

  // Set the text that you want to convert to speech
  utterance.lang = 'en-US'
  utterance.text = title.value
  utterance.volume = 0.1
  utterance.voice = speechSynthesis.getVoices()[0]

  /**
   *
   */
  utterance.onboundary = (event) => {
    if (event.name === 'word') {
      const spokenWord = title.value.slice(
        event.charIndex,
        event.charIndex + event.charLength
      )

      subtitles.value = spokenWord

      // Draw video frame and overlay text to canvas
      const draw = () => {
        ctx!.drawImage(videoSrc.value, 0, 0, canvas.width, canvas.height)
        ctx!.font = '24px Arial'
        ctx!.fillStyle = 'white'
        ctx!.fillText(spokenWord, 10, 30)
        /* // Continue drawing frames
          requestAnimationFrame(draw) */
        // Continue drawing frames if recording
        requestAnimationFrame(draw)
      }

      // Start drawing frames
      draw()
    }
  }

  /**
   *
   */
  utterance.onend = () => {
    videoSrc.value.pause()
    mediaRecorder.stop()
  }

  /**
   *
   */
  combinedStream = new MediaStream([
    ...videoStream.getTracks(),
    ...destination.stream.getTracks(),
  ])

  mediaRecorder = new MediaRecorder(combinedStream)

  mediaRec(mediaRecorder)
  window.speechSynthesis.speak(utterance)
}

/**
 *
 */
onMounted(() => {
  const startTime = 2

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
        <Input placeholder="Text" v-model="title" />
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
      <canvas ref="canvasRef">
        <h1 class="text-4xl text-center text-yellow-300">
          {{ subtitles }}
        </h1>
      </canvas>
    </Card>

    <div class="relative vertical-frame z-0" id="recordedDiv">
      <video id="myVideo" class="relative" ref="videoSrc">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div
        class="absolute top-0 w-full flex items-center justify-center h-full"
      >
        <h1 class="text-4xl text-center text-yellow-300">
          {{ subtitles }}
        </h1>
      </div>
    </div>
  </div>
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
