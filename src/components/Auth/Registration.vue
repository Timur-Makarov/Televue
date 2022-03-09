<template>
  <div
    class="auth-image"
    style="
      background-image: url('https://lh3.googleusercontent.com/cSb0NTv_dfGIBl9H9T4aSVocqoeVpplHGv30yJhlYwAWKa2U0ZTKXWTKz7UyFxleNlw_8zOIgFPu6elXmNCSVY_ILt0cwNOPp4cU=w420');
    "
  ></div>
  <!-- Col -->
  <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
    <h3 class="pt-4 text-2xl text-center">Register new Account</h3>
    <FormKit
      type="form"
      @submit="onSubmit"
      submit-label="Register Account"
      :form-class="'px-8 pt-6 pb-4 mb-4 bg-white rounded'"
      :errors="[errorMessage]"
    >
      <FormKit
        type="text"
        label="Nickname"
        placeholder="McDonald's"
        name="nickname"
        validation="required|length:3"
        :validation-messages="{ length: 'Must be at least 3 characters' }"
        :config="{ classes: { input: 'custom-input' } }"
        outer-class="mb-4"
      />
      <FormKit
        type="text"
        label="Email"
        placeholder="example@shamil.com"
        name="email"
        validation="required|email"
        :config="{ classes: { input: 'custom-input' } }"
        outer-class="mb-4"
      >
      </FormKit>
      <div class="mb-4 md:flex md:justify-between">
        <FormKit
          type="password"
          label="Password"
          placeholder="******************"
          name="password"
          validation="required|length:6"
          :validation-messages="{ length: 'Must be at least 6 characters' }"
          :config="{ classes: { input: 'custom-input' } }"
          outer-class="mb-4 md:mr-2 md:mb-0"
        >
        </FormKit>
        <FormKit
          type="password"
          label="Confirm Password"
          placeholder="******************"
          name="password_confirm"
          validation="required|confirm"
          :config="{ classes: { input: 'custom-input' } }"
          outer-class="mb-4 md:mr-2 md:mb-0"
        />
      </div>
    </FormKit>
    <hr class="mb-6 border-t" />

    <div class="text-center">
      <router-link
        to="login"
        class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
      >
        Already have an account? Login!
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { FormKit } from "@formkit/vue";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { generateRandomAvatar, getErrorMessageByFirebaseCode } from "@/utils/authHelpers";
import { JoinGroup } from "@/FB_Queries/create-join";

interface UserDTO {
  email: string;
  nickname: string;
  password: string;
}
const welcomeChat = "920cb2f1-0812-4be1-93b5-76ff983ce1ec";
const errorMessage = ref("");
const router = useRouter();

const onSubmit = (formData: UserDTO) => {
  return createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then(({ user }) => {
      JoinGroup(welcomeChat, user.uid);
      updateProfile(user, {
        displayName: formData.nickname,
        photoURL: generateRandomAvatar(),
      })
        .then(() => router.push(`/group/${welcomeChat}`))
        .catch((err) => console.log(err));
    })
    .catch((err) => (errorMessage.value = getErrorMessageByFirebaseCode(err.code)));
};
</script>

<style></style>
