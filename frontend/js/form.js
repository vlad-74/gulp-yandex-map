export function getForm ( obj, startArr) {
    var linkValue;
    var nameValue;
    var adresValue;
    var descValue;
    var telValue;
    Object.keys(startArr).map(
        key => {
            if (key === obj + '') {
                linkValue = startArr[key].properties.balloonContentHeader;
                linkValue = linkValue.length < 90 ? 'Информация об организации' : linkValue;
                var str = startArr[key].properties.balloonContentBody;
                var res = str.split('</div>');
                for (let i = 0; i < res.length; i++) {
                    switch (i) {
                        case 0:
                            nameValue = res[i] + '</div>';
                            break;
                        case 1:
                            adresValue = res[i] + '</div>';
                            break;
                        case 2:
                            descValue = res[i] + '</div>';
                            break;
                        case 3:
                            telValue = res[i] + '</div>';
                            break;
                    }   
                }
            }
        }
      );
      return       `
      <p> ${linkValue || ''} </p>
      <div class='form-group'>
          ${nameValue || ''} 
      </div>
      <div class='form-group'>
          ${adresValue || ''} 
      </div>
      <div class='form-group'>
      ${descValue || ''} 
      </div>
      <div class='form-group'>
          ${telValue || ''} 
      </div>
      <div class='flex'>
          <button id='exit'> Выйти </button> 
          <button disabled id='save'> Сохранить </button>
      </div>
      `
}