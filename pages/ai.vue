<script setup lang="ts">
definePageMeta({
  layout: "add-layout",
});

onMounted(async () => {
  const res = await $fetch("/api/hello", {
    method: "post",
    body: {
      url: "https://old.reddit.com/r/relationship_advice/comments/1ch9imf/caught_my35m_wife34_sending_pics_to_bil40m_is_our/",
    },
  });
  console.log(res);
});
</script>

<template>
  <div class="container container-sm">
    <Card class="p-6 space-y-6">
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
        <Button>Submit</Button>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.container-sm {
  max-width: 960px;
}
</style>
