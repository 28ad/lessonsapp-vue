<template>
    <div>
        <!-- Sort boxes container -->
        <div class="sort-container">
            <!-- Title -->
            <select v-model="titleSort" @change="sortByTitle">
                <option value="Default">Title</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>

            <!-- Location -->
            <select v-model="locationSort" @change="sortByLocation">
                <option value="Location">Location</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>

            <!-- Availability -->
            <select v-model="availabilitySort" @change="sortByAvailability">
                <option value="Spaces">Spaces</option>
                <option value="Ascending">Low - High</option>
                <option value="Descending">High - Low</option>
            </select>

            <!-- Price -->
            <select v-model="priceSort" @change="sortByPrice">
                <option value="Price">Price</option>
                <option value="Ascending">Low - High</option>
                <option value="Descending">High - Low</option>
            </select>
        </div>

        <div class="wrap">
            <div class="search">
                <input v-model="searchTerm" @input="searchLessons" type="text" class="searchTerm"
                    placeholder="What are you looking for?">
                <button type="submit" class="searchButton">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>

        <!-- Display search results -->
        <div class="cards" v-if="searchResults.length > 0">
            <div v-for="result in searchResults" :key="result._id">
                <div class="lesson-container">
                    <img :src="result.img" alt="Icon">
                    <h2>{{ result.name }}</h2>
                    <p>{{ result.location }}</p>
                    <p>£ {{ result.price }}</p>
                    <p>Spaces : {{ result.invQuantity }}</p>
                    <button class="addToBasket" @click="addToCart(result, subjectIndex)"
                        v-if="checkAvailability(result)">ADD LESSON</button>
                    <button class="btn-disabled" disabled v-else>ADD LESSON</button>
                </div>
            </div>
        </div>

        <!-- Lesson page container -->
        <div class="cards" v-else>
            <div v-for="(subject, subjectIndex) in subjects" :key="subject.product_id">
                <div class="lesson-container">
                    <img :src="subject.img" alt="Icon">
                    <h2>{{ subject.name }}</h2>
                    <p>{{ subject.location }}</p>
                    <p>£ {{ subject.price }}</p>
                    <p>Spaces : {{ subject.invQuantity }}</p>
                    <button class="addToBasket" @click="addToCart(subject, subjectIndex)"
                        v-if="checkAvailability(subject)">ADD LESSON</button>
                    <button class="btn-disabled" disabled v-else>ADD LESSON</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LessonsList",
    props: {
        subjects: Array,
        cart: Array,
    },
    data() {

        return {
            titleSort: 'Default',
            locationSort: 'Location',
            availabilitySort: 'Spaces',
            priceSort: 'Price',
            searchTerm: '',
            searchResults: [],
        }
    },
    methods: {
        // sort subjects by title

        sortByTitle: function () {


            // sort in ascending order alphabetically
            if (this.titleSort === "Ascending") {

                this.subjects.sort((first, second) => first.name.localeCompare(second.name));

            } else if (this.titleSort === "Descending") { // sort in descending order

                this.subjects.sort((first, second) => second.name.localeCompare(first.name));

            }
        },

        // sort subjects by location

        sortByLocation: function () {


            // sort in ascending order alphabetically
            if (this.locationSort === "Ascending") {

                this.subjects.sort((first, second) => first.location.localeCompare(second.location));

            } else if (this.locationSort === "Descending") { // sort in descending order

                this.subjects.sort((first, second) => second.location.localeCompare(first.location));

            }
        },

        // sort subjects by availability

        sortByAvailability: function () {


            // sort in ascending order
            if (this.availabilitySort === "Ascending") {

                this.subjects.sort((first, second) => first.invQuantity - second.invQuantity);

            } else if (this.availabilitySort === "Descending") { // sort in descending order

                this.subjects.sort((first, second) => second.invQuantity - first.invQuantity);

            }
        },

        // sort subjects by price

        sortByPrice: function () {


            // sort in ascending order
            if (this.priceSort === "Ascending") {

                this.subjects.sort((first, second) => first.price - second.price);

            } else if (this.priceSort === "Descending") { // sort in descending order

                this.subjects.sort((first, second) => second.price - first.price);

            }
        },

        searchLessons: function () {
            // Use the searchTerm from the data property
            const searchTerm = this.searchTerm.trim();

            if (searchTerm === '') {
                // If the search term is empty return list
                location.reload();
                console.log('Search term is empty.' + this.searchResults);
                return;
            }

            // Perform the search using the updated searchTerm
            fetch(`https://webstore-restapi.onrender.com/search/${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Search results:', data);
                    // Update the searchResults property to reflect the search results
                    this.searchResults = data;
                })
                .catch(error => console.error('Error searching lessons:', error));
        },

        addToCart(subject, subjectIndex) {
            this.$emit("add-to-cart", subject, subjectIndex);
        },
    },
    computed: {
       
        checkAvailability: function () {
            return function (subject) {
                return subject.invQuantity > 0;
            }
        }

    }
};
</script>