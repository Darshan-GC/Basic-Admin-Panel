var tableWrapper = $('<div>').attr('id', 'table-wrapper');
$('#table-section').append(tableWrapper);

var tableHeader = $('<div>').attr('id', 'table-headers');
$(tableWrapper).append(tableHeader);

var table = $('<table>');
$(tableHeader).append(table);

var tableHead = $('<thead>');
$(table).append(tableHead);

var tableRow = $('<tr>');
$(tableHead).append(tableRow);

var tableColumn = $('<th>').addClass('column1').text('Id');
$(tableRow).append(tableColumn);

var tableColumn = $('<th>').addClass('column2').text('FirstName');
$(tableRow).append(tableColumn);

var tableColumn = $('<th>').addClass('column3').text('LastName');
$(tableRow).append(tableColumn);

var tableColumn = $('<th>').addClass('column4').text('Email');
$(tableRow).append(tableColumn);

var tableColumn = $('<th>').addClass('column5').text('Phone');
$(tableRow).append(tableColumn);

// Details //

var infoWrapper = $('<div>').attr('id', 'info-wrapper');
$('main').append(infoWrapper);

var heading = $('<h1>').text('Details');
$(infoWrapper).append(heading);

var clickTable = $('<p>').text(
  'Click on a table item to get detailed information'
);
$(infoWrapper).append(clickTable);

// GET Call //
$.ajax({
  url: 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
  success: function data(output) {
    $('#overlay').css('display', 'none');
    render(output);
    sessionStorage.setItem('response', JSON.stringify(output));
    $('#search-box').keyup(function arrange() {
      var searchValue = $(this).val();

      var result = output.filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          lastName.toLowerCase().includes(searchValue.toLowerCase())
      );
      $('#table-data').remove();
      render(result);
    });
  },
  async: true,
});

// search //

$('#table-section form').submit(function (e) {
  e.preventDefault();
});

function render(result) {
  var tableData = $('<div>').attr('id', 'table-data');
  $(tableWrapper).append(tableData);

  var table = $('<table>');
  $(tableData).append(table);

  var tableBody = $('<tbody>');
  $(table).append(tableBody);

  for (var i = 0; i < result.length; i++) {
    var tableRow = $('<tr>').addClass('data-row').attr('id', i);
    $(tableBody).append(tableRow);

    var tableColumn = $('<td>').addClass('column1').text(result[i].id);
    $(tableRow).append(tableColumn);

    var tableColumn = $('<td>').addClass('column2').text(result[i].firstName);
    $(tableRow).append(tableColumn);

    var tableColumn = $('<td>').addClass('column3').text(result[i].lastName);
    $(tableRow).append(tableColumn);

    var tableColumn = $('<td>').addClass('column4').text(result[i].email);
    $(tableRow).append(tableColumn);

    var tableColumn = $('<td>').addClass('column5').text(result[i].phone);
    $(tableRow).append(tableColumn);
  }
}

// Click Border //

$(document).on('click', '.data-row', function () {
  $('#info-content').remove();

  $(this).addClass('active').siblings().removeClass('active');

  // Get response from session Storage //
  var click = JSON.parse(sessionStorage.getItem('response'));

  //  Details //
  var infoContent = $('<div>').attr('id', 'info-content');
  $(infoWrapper).append(infoContent);
  var id = $(this).attr('id');

  var infoName = $('<div>').text(
    click[id].firstName + ' ' + click[id].lastName
  );
  var userBold = $('<b>').text('User Selected : ');
  $(infoName).prepend(userBold);
  $(infoContent).append(infoName);

  var disWrapper = $('<div>');
  $(infoContent).append(disWrapper);

  var dis = $('<b>').text('Description: ');
  $(disWrapper).append(dis);

  var textArea = $('<textarea>').text(click[id].description).attr({
    cols: 50,
    rows: 5,
  });
  $(disWrapper).append(textArea);

  var address = $('<div>').text(click[id].address.streetAddress);
  var addressBold = $('<b>').text('Address: ');
  $(address).prepend(addressBold);
  $(infoContent).append(address);

  var city = $('<div>').text(click[id].address.city);
  var cityBold = $('<b>').text('City: ');
  $(city).prepend(cityBold);
  $(infoContent).append(city);

  var state = $('<div>').text(click[id].address.state);
  var stateBold = $('<b>').text('State: ');
  $(state).prepend(stateBold);
  $(infoContent).append(state);

  var zip = $('<div>').text(click[id].address.zip);
  var zipBold = $('<b>').text('Zip: ');
  $(zip).prepend(zipBold);
  $(infoContent).append(zip);
});
