<template>
  <section class="colors-container">
    <button
      @click="changeColor('rgb(13, 87, 3)')"
      class="btn-color dark-green"
    ></button><button
      @click="changeColor('rgb(35, 165, 18)')"
      class="btn-color green"
    ></button><button
      @click="changeColor('rgb(100, 98, 1)')"
      class="btn-color khaki"
    ></button><button
      @click="changeColor(rgb(230, 114, 5))"
      class="btn-color orange"
    ></button><button
      @click="changeColor('rgb(250, 162, 62)')"
      class="btn-color light-orange"
    ></button><button
      @click="changeColor('rgb(255, 222, 36)')"
      class="btn-color yellow"
    ></button><button
      @click="changeColor('rgb(78, 10, 167)')"
      class="btn-color purple"
    ></button><button
      @click="changeColor('rgb(126, 82, 177)')"
      class="btn-color light-purple"
    ></button><button
      @click="changeColor('rgb(21, 75, 226)')"
      class="btn-color blue"
    ></button><button
      @click="changeColor('rgb(63, 5, 5)')"
      class="btn-color bourdeaux"
    ></button><button
      @click="changeColor('rgb(241, 1, 1)')"
      class="btn-color red"
    ></button><button
      @click="changeColor('rgb(232, 109, 248)')"
      class="btn-color pink"
    ></button><button
      @click="changeColor('rgb(0, 0, 0)')"
      class="btn-color black"
    ></button><button
      @click="changeColor('rgb(83, 40, 4)')"
      class="btn-color brown"
    ></button><button
      @click="changeColor('rgb(64, 65, 64)')"
      class="btn-color gray"
    ></button>
  </section>
</template>

<script>
export default {
  name: "colorPicker",
  methods: {
    changeColor(rgb) {
      console.log('the color is:', rgb);
      this.$emit("changeColor", rgb);
    },
  },
};
</script>
