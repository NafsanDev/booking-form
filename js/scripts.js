// BOOKING FORM Scripts
// Adjust Date Picker
const dateInput = document.getElementById('dates');
const calendarIcon = document.querySelector('#bf-date svg');

calendarIcon.addEventListener('click', function () {
  dateInput.showPicker(); // Open the date picker
});

// SELECT POPULAR ORIGINS AND DESTINATIONS
jQuery( document ).ready(function($) {
    const cities = [        
        'Bacolod', 
        'Batangas',
        'Bohol',
		'Boracay',
		'Butuan',
        'Caticlan',
        'Cagayan De oro',
        'Cebu',
        'Coron',
        'Davao',
        'Dipolog', 
        'Dumaguete',
		'General Santos',
        'Iloilo', 
        'Iligan', 
        'Manila',
        'Nasipit',
        'Odiongan',
        'Ozamis',
		'Puerto Princesa',
        'Romblon',
        'Roxas City',
		'Soccsksargen',
		'Tagbilaran',
        'Zamboanga'
    ];

    let activeInput = null;
    const $inputs = $('#booking-form input[type="text"]');
    const $allResults = $('.city-list');

    // Handle input focus/click
    $inputs.on('focus click', function() {
        $(this).val('');
        activeInput = $(this);
        const targetResults = $(`#${activeInput.data('target')}`);
        showAllCities(targetResults);
                
        // Hide other results
        $allResults.not(targetResults).hide();
    });

    // Handle input typing
    $inputs.on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const targetResults = $(`#${activeInput.data('target')}`);
        
        if (searchTerm.length === 0) {
            showAllCities(targetResults);
        } else {
            const matches = cities.filter(city => 
                city.toLowerCase().startsWith(searchTerm)
            );
            updateResults(matches, targetResults);
        }
    });

    // Show all cities initially
    function showAllCities(target) {
        updateResults(cities, target);
        target.show();
    }

    // Update results display
    function updateResults(matches, target) {
        target.empty();
        
        matches.forEach(city => {
            target.append(
                $('<li>')
                    .text(city)
                    .click(() => {
                        activeInput.val(city);
                        target.hide();
                    })
            );
        });
    }

    // Hide results when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('input, .city-list').length) {
            $allResults.hide();
        }
    });
});

// Form Submit
jQuery( document ).ready(function($) {
    // Show date, Format
    const dep2 = new Date();
    dep2.setDate(dep2.getDate() + 6);
    $("#msf_dates").val(new Date(dep2).toISOString().substr(0, 10));

    // Swipe Button
    $('#msf_swap').click(function(){
        let msfFrom = $('#msf_origin').val(),
        msfTo = $('#msf_destination').val();
        $('#msf_origin').val(msfTo);
        $('#msf_destination').val(msfFrom);
    });

    function validateField(field) {
        const value = $(field).val().trim();
        let isValid = true;

        if(value === '') {
            $(field).addClass('is-invalid');
            isValid = false;
        }else if(value.length < 4) {
            $(field).addClass('is-invalid');
            isValid = false;
        }else {
            $(field).removeClass('is-invalid');
        }
        return isValid;
    }

    // Booking submit
     $('#msf_submit').on('click', function(e) {
        e.preventDefault();
        let formValid = true,
        msfOrigin = $('#msf_origin').val(),
        msfDestination = $('#msf_destination').val(),
        msfDate = $('#msf_dates').val(),
        msfURL = "https://book.phbus.com/en/travel/";

        // Validate origin
        if(!validateField('#msf_origin')) {
            formValid = false;
        }

        // Validate destination
        if(!validateField('#msf_destination')) {
            formValid = false;
        }

        // Same input
        if(msfOrigin === msfDestination){
            $('#msf_destination').addClass('is-invalid');
            formValid = false;
        }

        if(formValid) {
            msfOrigin = msfOrigin.replace(/\s/g , "-").toLowerCase();
            msfDestination = msfDestination.replace(/\s/g , "-").toLowerCase();
            msfURL += msfOrigin+"/"+msfDestination+"?date="+msfDate+"?sub_id=2goonlinebooking";
            window.open(msfURL, '_blank');
        }else{
            e.preventDefault();
        }
    });
})  
