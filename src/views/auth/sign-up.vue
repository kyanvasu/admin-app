<template>
    <auth-container
        :app-name="appName"
        :background-src="backgroundSrc"
        :logo-src="logoSrc"
        logo-title="Create your account"
    >
        <template slot="auth-form">
            <form
                class="p-t-15"
                autocomplete="off"
                @submit.prevent="verifyFields(true)"
            >
                <div :class="{ 'error' : errors.first('firstname') }" class="form-group form-group-default required">
                    <label>First Name</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.firstname.value"
                            v-validate="form.fields.firstname.validations"
                            type="text"
                            name="firstname"
                            placeholder="John"
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("firstname") }}</span>
                <div :class="{ 'error' : errors.first('lastname') }" class="form-group form-group-default required">
                    <label>Last Name</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.lastname.value"
                            v-validate="form.fields.lastname.validations"
                            type="text"
                            name="lastname"
                            placeholder="Smith"
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("lastname") }}</span>
                <div :class="{ 'error' : errors.first('email') }" class="form-group form-group-default required">
                    <label>Email</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.email.value"
                            v-validate="form.fields.email.validations"
                            type="text"
                            name="email"
                            autocomplete="off"
                            placeholder="user@example.com"
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("email") }}</span>
                <div :class="{ 'error' : errors.first('password') }" class="form-group form-group-default required">
                    <label>Password</label>
                    <input-password
                        ref="password"
                        v-model="form.fields.password.value"
                        v-validate="form.fields.password.validations"
                        name="password"
                        placeholder="Credentials"
                    />
                </div>
                <span class="text-danger">{{ errors.first("password") }}</span>
                <div :class="{ 'error' : errors.first('verifyPassword') }" class="form-group form-group-default required">
                    <label>Confirm Password</label>
                    <input-password
                        id="verifyPassword"
                        v-model="form.fields.verifyPassword.value"
                        v-validate="form.fields.verifyPassword.validations"
                        name="verifyPassword"
                        data-vv-as="confirm password"
                        placeholder="Retype credentials"
                    />
                </div>
                <span class="text-danger">{{ errors.first("verifyPassword") }}</span>
                <div :class="{ 'error' : errors.first('company') }" class="form-group form-group-default required">
                    <label>Company Name</label>
                    <div class="controls">
                        <input
                            v-model="form.fields.company.value"
                            v-validate="form.fields.company.validations"
                            type="text"
                            name="company"
                            placeholder="John Smith Co."
                            class="form-control"
                        >
                    </div>
                </div>
                <span class="text-danger">{{ errors.first("company") }}</span>
                <button class="btn btn-primary btn-block my-4" type="submit">
                    Sign Up
                </button>
                <div class="text-center small">
                    Already have an account?
                    <router-link :to="{ name: 'login' }" class="text-info">
                        Log in!
                    </router-link>
                </div>
            </form>
        </template>
    </auth-container>
</template>

<script>
import authMixins from "@/mixins/auth";
import InputPassword from "@c/molecules/input-password.vue";

export default {
    name: "SignUp",
    components: {
        InputPassword
    },
    mixins: [
        authMixins
    ],
    data() {
        return {
            form: {
                fields: {
                    firstname: {
                        validations: "required",
                        value: ""
                    },
                    lastname: {
                        validations: "required",
                        value: ""
                    },
                    email: {
                        validations: "required|email",
                        value: ""
                    },
                    password: {
                        validations: "required|min:8",
                        value: ""
                    },
                    verifyPassword: {
                        map: "verify_password",
                        validations: "required|confirmed:password",
                        value: ""
                    },
                    company: {
                        map: "default_company",
                        validations: "required",
                        value: ""
                    }
                },
                endpoint: "/users"
            }
        }
    }
}
</script>
