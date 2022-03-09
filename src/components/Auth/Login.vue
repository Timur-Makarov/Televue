<template>
  <div class="flex flex-row-reverse w-full">
    <div
      class="auth-image"
      style="
        background-image: url('https://lh3.googleusercontent.com/PDRxJIZMtinLvooGlOvXCkHsTCrwLHq9OM8hqaWEsLS0ZAzAgzQjSADvVb7DZf4XtJ8GI0K9h6jfQeKuI7kLH3O6_oQPdHCxSGFAmQ=w450');
      "
    ></div>
    <!-- Col -->
    <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
      <h3 class="pt-4 text-2xl text-center">Welcome back!</h3>
      <FormKit
        type="form"
        @submit="onSubmit"
        submit-label="Login"
        :form-class="'px-8 pt-6 pb-8 mb-4 bg-white rounded'"
        :errors="[errorMessage]"
      >
        <FormKit
          type="text"
          label="Email"
          placeholder="example@shamil.com"
          name="email"
          :config="{ classes: { input: 'custom-input' } }"
          outer-class="mb-4"
          validation="required|email"
        />
        <FormKit
          type="password"
          label="Password"
          placeholder="******************"
          name="password"
          :config="{ classes: { input: 'custom-input' } }"
          outer-class="mb-4"
          validation="required"
        />
      </FormKit>
      <hr class="mb-6 border-t" />
      <div class="text-center">
        <router-link
          to="registration"
          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
        >
          Don't have an account? Register!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { FormKit } from "@formkit/vue";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { getErrorMessageByFirebaseCode } from "@/utils/authHelpers";
import { JoinGroup } from "@/FB_Queries/create-join";

const router = useRouter();
const errorMessage = ref("");

interface LoginDTO {
  email: string;
  password: string;
}

const onSubmit = async (formData: LoginDTO) => {
  signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then(() => {
      router.push("/");
    })
    .catch((err) => {
      errorMessage.value = getErrorMessageByFirebaseCode(err.code);
    });
};
</script>

<style>
.auth-image {
  @apply w-96 h-auto bg-gray-400 hidden lg:block lg:w-5/12 rounded-l-lg bg-center;
}
</style>
