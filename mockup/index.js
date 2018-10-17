const firstNameAlert = 'First Name Required';
const lastNameAlert = 'Last Name Required';
const inputMap = {
  'inputdob': ['#birthdate', 'Birthdate'],
  'inputloc': ['#location', 'From'],
  'inputfavcol': ['#favcolor', 'Favorite Color'],
  'inputfavsong': ['#favsong', 'Favorite Song'],
  'inputfavan': ['#favanimal', 'Favorite Animal']
};

$('.button').hover(function () {
  $(this).toggleClass('hovered');
});
$('form').submit(function (event) {
  if ((value = $('#inputfirst').val()).length) {
    $('#firstname').html(value);
    $('#inputfirst').removeClass('alert');
    $('#inputfirst').attr('placeholder', 'First Name');
  } else {
    $('#inputfirst').addClass('alert');
    $('#inputfirst').attr('placeholder', firstNameAlert);
  }
  if ((value = $('#inputlast').val()).length) {
    $('#lastname').html(value);
    $('#inputlast').removeClass('alert');
    $('#inputlast').attr('placeholder', 'Last Name');
  } else {
    $('#inputlast').addClass('alert');
    $('#inputlast').attr('placeholder', lastNameAlert);
  }
  $('input').each(function () {
    let id, target, value;

    if ((value = $(this).val()).length) {
      id = $(this).attr('id');
      if (id && (target = inputMap[id])) {
        $(target[0]).removeClass('toggleview');
        if ($(this).attr('type') === 'date') {
          value = moment(value).format('MMMM Do, YYYY');
        }
        $(target[0]).html('<strong>' + target[1] + ':</strong> ' + value);
        $(this).val('');
      }
    }

    id = $(this).attr('id');
    if (id && (value = inputMap[id])) {
      $(value).removeClass('toggleview');
    }
  });
  event.preventDefault();
});