<template>
<<<<<<< HEAD
    <div class="user-profile-info">
        <div>
            <img id="profile-image" :src="this.imageUrl">
            <div ref="profileInfoArea">
                <p>{{ this.user.username }}</p>
                <p>{{ this.user.name }}</p>
                <p>{{ this.user.country }}</p>
                <p>{{ this.user.description }}</p>
            </div>
            <div ref="profileEditingArea" class="d-none">
                <div>
                    <div>
                        <p>Username</p>
                        <input type="text" name="username" id="username" v-model="this.user.username">
                    </div>
                    <div>
                        <p>Nome</p>
                        <input type="text" name="name" id="name" v-model="this.user.name">
=======
    <div ref="userProfileTop" class="user-profile-info" :class="{ 'edit-mode': this.editMode }">
        <div>
            <img class="profile-image" :src="this.imageUrl" />
            <div ref="profileInfoArea" class="profile-info-area" :class="{ 'd-none': this.editMode }">
                <p>{{ this.user.username }}</p>
                <p>{{ this.user.name }}</p>
                <p v-if:="ownProfile">{{ this.user.email }}</p>
                <p>{{ this.user.description }}</p>
                <button v-if:="!this.user.id_subscription && !ownProfile" v-on:click="createSubscription">{{ $t("profile.subscribe") }}</button>
                <button v-if:="this.user.id_subscription && !ownProfile" v-on:click="endSubscription">{{ $t("profile.unsubscribe") }}</button>
            </div>
            <div ref="profileEditingArea" class="profile-edit-area" :class="{ 'd-none': !this.editMode }" v-if="this.ownProfile">
                <div>
                    <div>
                        <p>{{ $t("profile.name") }}</p>
                        <input ref="nameInput" type="text" name="name" id="name" v-model="this.user.name" autocomplete="off"/>
>>>>>>> origin/development
                    </div>
                </div>
                <div>
                    <div>
<<<<<<< HEAD
                        <p>País</p>
                        <select name="country" id="country" v-model="this.user.country">
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Åland Islands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-bissau">Guinea-bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-leste">Timor-leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                    </div>
                    <div>
                        <p>Descrição</p>
                        <textarea name="description" id="description" cols="80" rows="5" v-model="this.user.description"></textarea>
=======
                        <p>{{ $t("profile.description") }}</p>
                        <textarea ref="descriptionInput" name="description" id="description" v-model="this.user.description"></textarea>
>>>>>>> origin/development
                    </div>
                </div>
            </div>
        </div>
<<<<<<< HEAD
        <button ref="editProfileButton" v-on:click="editProfile">EDITAR</button>
        <button ref="saveProfileButton" class="d-none" v-on:click="saveProfile">GUARDAR</button>
=======
        <button ref="editProfileButton" v-on:click="this.editMode = true" :class="{ 'd-none': this.editMode }" v-if="this.ownProfile">{{ $t("profile.EDIT") }}</button>
        <button ref="saveProfileButton" v-on:click="commitUserChanges" :class="{ 'd-none': !this.editMode }" v-if="this.ownProfile">{{ $t("profile.SAVE") }}</button>
>>>>>>> origin/development
    </div>
</template>

<script>
export default {
<<<<<<< HEAD
    name: 'UserProfileInfo',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: ""
        }
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    methods: {
        editProfile() {
            this.$refs.editProfileButton.classList.add("d-none");
            this.$refs.saveProfileButton.classList.remove("d-none");

            this.$refs.profileInfoArea.classList.add("d-none");
            this.$refs.profileEditingArea.classList.remove("d-none");
        },
        saveProfile() {
            this.$refs.editProfileButton.classList.remove("d-none");
            this.$refs.saveProfileButton.classList.add("d-none");

            this.$refs.profileInfoArea.classList.remove("d-none");
            this.$refs.profileEditingArea.classList.add("d-none");

            this.$emit('alterar-dados', user); 
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-profile-info {
        display: flex;
=======
    name: "UserProfileInfo",
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            imageUrl: "",
            editMode: false,
        };
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    computed: {
        ownProfile() {
            return (this.$route.params.id == this.$store.getters.getUser.id);
        }
    },
    methods: {
        commitUserChanges() {
            let info = {
                name: this.$refs.nameInput.value,
                description: this.$refs.descriptionInput.value,
            };

            this.editMode = false;
            this.$emit("alterar-dados", info);
        },
        createSubscription() {
            let info = {
                id_subscriber: this.$store.getters.getUser.id,
                id_subscribed: this.user.id,
            };
            this.$emit("createSubscription", info);
        },
        endSubscription() {
            this.$emit("endSubscription")
        }
    }
};
</script>

<style scoped>
    .user-profile-info {
        display: flex;
        justify-content: space-between;
        align-items: end;
        background-color: var(--mobalytics-card);
        padding: 20px 64px;
        width: 60%;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        margin-bottom: 32px;
    }

    .user-profile-info.edit-mode {
        width: 100%;
    }

    .user-profile-info.edit {
        width: 75%;
>>>>>>> origin/development
    }

    .user-profile-info > div {
        display: flex;
    }

<<<<<<< HEAD
    #profile-image {
        height: 220px;
        width: 220px;
        border-radius: 50%;
        object-fit: cover;
    }

    #profile-editing-area p {
        margin-bottom: 8px;
    }

    #profile-editing-area {
        display: flex;
    }

    .d-none {
        display: none !important;
=======
    .profile-info-area {
        padding: 12px 0px;
        margin-right: 24px;
    }

    .profile-info-area p {
        color: var(--light);
        vertical-align: center;
    }

    .profile-info-area p:first-child {
        color: var(--primary);
        font-size: 22px;
    }

    .profile-info-area p:last-child {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        width: 300px;
    }

    .profile-image {
        height: 180px;
        width: 180px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 48px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .profile-edit-area p {
        margin-bottom: 4px;
        color: var(--light);
    }

    .profile-edit-area input {
        border: none;
        padding: 4px 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        color: var(--light);
        background-color: var(--mobalytics-back);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .profile-edit-area input:focus {
        outline: none;
    }

    .profile-edit-area textarea {
        border: none;
        padding: 4px 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        width: 500px;
        height: 140px;
        color: var(--light);
        background-color: var(--mobalytics-back);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        resize: none;
    }

    .profile-edit-area textarea:focus {
        outline: none;
        width: 500px;
    }

    button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 50px;
        min-width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
        margin-bottom: 20px;
    }

    /* 

    SELECT

    */

    .custom-select {
        position: relative;
        width: 218px;
        text-align: left;
        height: 32px;
        line-height: 32px;
        margin-bottom: 16px;
    }

    .custom-select .selected {
        background-color: var(--mobalytics-back);
        border-radius: 8px;
        color: var(--light);
        padding-left: 1em;
        cursor: pointer;
        margin-bottom: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .custom-select .selected:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: var(--light) transparent transparent transparent;
    }

    .custom-select .items {
        color: var(--light);
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        background-color: var(--mobalytics-back);
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        max-height: 300px;
    }

    .custom-select .items::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-card);
        border-radius: 8px;
    }

    .custom-select .items::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .custom-select .items div {
        padding-left: 1em;
        cursor: pointer;
    }

    .custom-select .items div:hover {
        background-color: var(--mobalytics-card);
    }

    .selectHide {
        display: none;
    }

    @media (max-width: 1650px) {
        .user-profile-info {
            width: 70%;
        }

        .user-profile-info.edit-mode textarea {
            width: 400px;
        }
    }

    @media (max-width: 1500px) {
        .user-profile-info {
            width: 80%;
        }
    }

    @media (max-width: 1350px) {
        .user-profile-info {
            width: 90%;
        }
    }

    @media (max-width: 1300px) {
        .user-profile-info.edit-mode > div {
            display: block;
        }

        .user-profile-info.edit-mode .profile-image {
            margin-bottom: 32px;
        }

        .user-profile-info.edit-mode textarea {
            margin-bottom: 0px;
        }

        .user-profile-info.edit-mode button {
            margin-bottom: 8px;
        }
    }

    @media (max-width: 1250px) {
        .user-profile-info {
            width: 100%;
        }
        .user-profile-info {
            padding: 20px 32px;
        }

        .profile-image {
            margin-right: 24px;
        }

        .profile-info-area p:last-child {
            width: 240px;
        }
    }

    @media (max-width: 750px) {
        .user-profile-info > div {
            display: block;
        }

        .profile-image {
            margin-bottom: 32px;
        }
    }

    @media (max-width: 750px) {
        .user-profile-info.edit-mode {
            display: block;
        }

        .user-profile-info.edit-mode textarea {
            margin-bottom: 24px;
        }
    }

    @media (max-width: 575px) {
        .user-profile-info.edit-mode textarea {
            width: 100%;
        }
    }

    @media (max-width: 550px) {
        .user-profile-info {
            display: block;
        }
    }

    @media (max-width: 500px) {
        .profile-info-area p:last-child {
            width: 200px;
        }
>>>>>>> origin/development
    }
</style>