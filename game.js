
phina.globalize();

var ASSETS = {
  image: {
    face1: "media/20160509062955.jpg",
    face2: "media/face.jpg",
  },
};

var MESSAGE_SPEED = 2; //1<n 低いほど早い
var FONT_SIZE = 35;

phina.define('MainScene',{
  superClass:'DisplayScene',

  init:function(opt){
    this.superInit(opt);

    this.utyuujin = Utyuujin().addChildTo(this)
    .setPosition(this.gridX.center(),this.gridY.center());

    var that = this;

    this.initDomElement();

    this.data;

    this.initFirebaseCallback();

    // console.log(this.data[1]);

    var height = 200;

    this.mainMesssageRect = RectangleShape({
      cornerRadius:15,
      width:600,
      height:height,
      strokeWidth:5,
      stroke:'white',
      fill:'rgba(0,0,0,0.5)',
    }).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center(5.5));

    this.mainMessageLabelArea = LabelArea({
      text:'',
      width:550,
      height:height - 50,
      fontSize:FONT_SIZE,
      fill:'white',
      stroke: 'black',
      strokeWidth: 4,
    }).addChildTo(this.mainMesssageRect);

    this.initButtons();

    this.texts;
    this.globalSituationNumber = 0;
    this.localSituationNumber = 0;
    this.textIndex = 0;
    this.charIndex = 0;

    this.nextTriangle = TriangleShape({
      fill:'rgba(255,255,255,0.5)',
      stroke:'transparent',
      radius:FONT_SIZE/2,
    }).addChildTo(this)
    .setPosition(this.mainMesssageRect.right - 25, this.mainMesssageRect.bottom - 25);
    this.nextTriangle.rotation = 180;
    this.nextTriangle.hide();

    this.messageSpeed = MESSAGE_SPEED;

    this.localSituationNumberLabel = LabelArea({
      text:'',
      width:100,
      height:50,
      fontSize:FONT_SIZE,
      fill:'white',
      stroke: 'gray',
      strokeWidth: 4,
    }).addChildTo(this).setPosition(this.gridX.center(7),this.gridY.center(-7));
    this.localSituationNumberLabel.update = function()
    {
      this.text = that.localSituationNumber;
    };

    console.log(this.width, this.height);
    },
    initDomElement:function()
    {
      this.messageIndex = document.querySelector('#messageIndex');
      this.messageText = document.querySelector('#messageText');
      this.messageRegisterButton = document.querySelector('#messageRegisterButton');
      this.choise1Input = document.querySelector('#choise1Input');
      this.choise1NextIndex = document.querySelector('#choise1NextIndex');
      this.choise2Input = document.querySelector('#choise2Input');
      this.choise2NextIndex = document.querySelector('#choise2NextIndex');
      this.choise3Input = document.querySelector('#choise3Input');
      this.choise3NextIndex = document.querySelector('#choise3NextIndex');
      this.choise4Input = document.querySelector('#choise4Input');
      this.choise4NextIndex = document.querySelector('#choise4NextIndex');

      this.destinationIndex = document.querySelector('#destinationIndex');
      this.moveButton = document.querySelector('#moveButton');

      this.scriptsLabel = document.querySelector('#scriptsLabel');


      var that = this;
      this.messageRegisterButton.onclick = function()
      {
        if (that.messageText.value != '' && that.messageIndex.value != '') {
          firebaseRefGame.child('messages').child(that.messageIndex.value).set({
            text: that.messageText.value,
            choise1Text: that.choise1Input.value,
            choise1Number:that.choise1NextIndex.value,
            choise2Text:  that.choise2Input.value,
            choise2Number:that.choise2NextIndex.value,
            choise3Text:  that.choise3Input.value,
            choise3Number:that.choise3NextIndex.value,
            choise4Text:  that.choise4Input.value,
            choise4Number:that.choise4NextIndex.value,
          });
          /*
          that.texts[0] = that.messageText.value;
          that.messageText.value = '';
          that.choise1Input.value = '';
          that.choise1NextIndex.value = '';
          that.choise2Input.value = '';
          that.choise2NextIndex.value = '';
          that.choise3Input.value = '';
          that.choise3NextIndex.value = '';
          that.choise4Input.value = '';
          that.choise4NextIndex.value = '';
          */
        }
      };

      this.moveButton.onclick = function()
      {
        if(that.data[that.destinationIndex.value] != null)
        {
          that.setText(that.destinationIndex.value);
          that.destinationIndex.value = '';
        }
      };
    },
initButtons:function()
{
  var that = this;
  var height = 80;
  var width = 290;
  var offsetHeight = 20;
  var xOffset = 3.8;
  var gridYPos = 1.5;

      this.choise1Rect = RectangleShape({
        cornerRadius:15,
        width:width,
        height:height,
        strokeWidth:5,
        stroke:'white',
        fill:'rgba(0,0,0,0.5)',
      }).addChildTo(this).setPosition(this.gridX.center(-xOffset),this.gridY.center(gridYPos));

      this.choise1LabelArea = LabelArea({
        text:'a',
        width:width - 50,
        height:height - offsetHeight,
        fontSize:FONT_SIZE,
        fill:'white',
        stroke: 'black',
        strokeWidth: 4,
      }).addChildTo(this.choise1Rect);

      this.choise2Rect = RectangleShape({
        cornerRadius:15,
        width:width,
        height:height,
        strokeWidth:5,
        stroke:'white',
        fill:'rgba(0,0,0,0.5)',
      }).addChildTo(this).setPosition(this.gridX.center(xOffset),this.gridY.center(gridYPos));

      this.choise2LabelArea = LabelArea({
        text:'a',
        width:width - 50,
        height:height - offsetHeight,
        fontSize:FONT_SIZE,
        fill:'white',
        stroke: 'black',
        strokeWidth: 4,
      }).addChildTo(this.choise2Rect);


      this.choise3Rect = RectangleShape({
        cornerRadius:15,
        width:width,
        height:height,
        strokeWidth:5,
        stroke:'white',
        fill:'rgba(0,0,0,0.5)',
      }).addChildTo(this).setPosition(this.gridX.center(-xOffset),this.gridY.center(gridYPos + 1.5));

      this.choise3LabelArea = LabelArea({
        text:'a',
        width:width - 50,
        height:height - offsetHeight,
        fontSize:FONT_SIZE,
        fill:'white',
        stroke: 'black',
        strokeWidth: 4,
      }).addChildTo(this.choise3Rect);


      this.choise4Rect = RectangleShape({
        cornerRadius:15,
        width:width,
        height:height,
        strokeWidth:5,
        stroke:'white',
        fill:'rgba(0,0,0,0.5)',
      }).addChildTo(this).setPosition(this.gridX.center(xOffset),this.gridY.center(gridYPos + 1.5));

      this.choise4LabelArea = LabelArea({
        text:'a',
        width:width - 50,
        height:height - offsetHeight,
        fontSize:FONT_SIZE,
        fill:'white',
        stroke: 'black',
        strokeWidth: 4,
      }).addChildTo(this.choise4Rect);


      this.disableChoises();

      this.mainMesssageRect.setInteractive(true);
      this.mainMesssageRect.onpointstart = function()
      {
        if(that.textAll){
          that.nextText();
        }
        else{
          that.showAllText();
        }
      };

      this.choise1Rect.onpointstart = function()
      {
        that.setText(that.data[that.localSituationNumber].choise1Number);
      };
      this.choise2Rect.onpointstart = function()
      {
        that.setText(that.data[that.localSituationNumber].choise2Number);
      };
      this.choise3Rect.onpointstart = function()
      {
        that.setText(that.data[that.localSituationNumber].choise3Number);
      };
      this.choise4Rect.onpointstart = function()
      {
        that.setText(that.data[that.localSituationNumber].choise4Number);
      };
},
initFirebaseCallback:function()
{
  var that = this;

  firebaseRefGame.child('messages').once('value', function(snapshot) {
    that.data = snapshot.val();
    //var message = data.text;
    //console.log(that.data);
    var keys = Object.keys(that.data);
    //console.log(keys);

    /*
    that.texts = that.data[that.localSituationNumber].text.split('#');
    //console.log(that.texts);

    var displayScripts = '';
    for(var script in that.data)
    {
      displayScripts += '</br>--- ' + script + ' ---';
      displayScripts += '</br>';
      displayScripts += that.data[script].text;
      displayScripts += '</br></br>';
      displayScripts += '*  ' + that.data[script].choise1Text + ' --> ' + that.data[script].choise1Number + 'へ</br>';
      displayScripts += '*  ' + that.data[script].choise2Text + ' --> ' + that.data[script].choise2Number + 'へ</br>';
      displayScripts += '*  ' + that.data[script].choise3Text + ' --> ' + that.data[script].choise3Number + 'へ</br>';
      displayScripts += '*  ' + that.data[script].choise4Text + ' --> ' + that.data[script].choise4Number + 'へ</br>';
    }

    that.scriptsLabel.innerHTML = displayScripts;
    */

    that.setData();
  });

  firebaseRefGame.on("child_added", function(snapshot) {
    that.data = snapshot.val();
    that.setData();
});

firebaseRefGame.on("child_changed", function(snapshot) {
  that.data = snapshot.val();
  that.setData();
});

firebaseRefGame.on("child_removed", function(snapshot) {
  that.data = snapshot.val();
  that.setData();
});

this.firebaseFirstChildAdded = true;

firebaseRefGame.child('messages').limitToLast(1).on("child_added", function(snapshot) {
  if(that.firebaseFirstChildAdded)
  {
    that.firebaseFirstChildAdded = false;
  }
  else
  {
    if(that.messageIndex.value == snapshot.key())
    {
        that.localSituationNumber = that.messageIndex.value;
    }
    console.log(snapshot.key());
  }
});

firebaseRefGame.child('messages').on("child_changed", function(snapshot)
{
  if(that.messageIndex.value == snapshot.key())
  {
      that.localSituationNumber = that.messageIndex.value;
  }
  console.log(snapshot.key());
});

firebaseRefGame.child('messages').on("child_removed", function(snapshot)
{
  that.localSituationNumber = 0;
  console.log(snapshot.key());
});

},
setData:function()
{
  this.texts = this.data[this.localSituationNumber].text.split('#');
  //console.log(that.texts);

  var displayScripts = '';
  for(var script in this.data)
  {
    displayScripts += '</br>--- ' + script + ' ---';
    displayScripts += '</br>';
    displayScripts += (this.data[script].text).replace(
      /["&'<>]/g,
      function( ch ) { return { '"':'&quot;', '&':'&amp;', '\'':'&#39;', '<':'&lt;', '>':'&gt;' }[ ch ]; }
      );
    displayScripts += '</br></br>';
    displayScripts += '*  ' + this.data[script].choise1Text + ' --> ' + this.data[script].choise1Number + 'へ</br>';
    displayScripts += '*  ' + this.data[script].choise2Text + ' --> ' + this.data[script].choise2Number + 'へ</br>';
    displayScripts += '*  ' + this.data[script].choise3Text + ' --> ' + this.data[script].choise3Number + 'へ</br>';
    displayScripts += '*  ' + this.data[script].choise4Text + ' --> ' + this.data[script].choise4Number + 'へ</br>';
  }

  this.scriptsLabel.innerHTML = displayScripts;

  this.setText(this.localSituationNumber);
},
  update:function(app){
    if(this.data != null)
    {

      if(app.frame % this.messageSpeed === 0){
        this.addChar();
      }

      if(this.textAll){
        if(app.frame % 32 === 0){
          if(this.nextTriangle.visible){
            this.nextTriangle.hide();
          }else{
            this.nextTriangle.show();
          }
        }
      }else{
        this.nextTriangle.hide();
      }
    }
  },
  onkeydown: function(e) {

/*
    if (e.keyCode == 13) {
      if (this.input.text != '') {
        firebaseRefGame.child('messages').child(1).set({
          text: this.input.value
        });
        this.texts[0] = this.input.value;
        this.input.value = '';
      }
    }
    */

  },

  setChoiseTexts:function()
  {
    var choise1Text = this.data[this.localSituationNumber].choise1Text;
    var choise2Text = this.data[this.localSituationNumber].choise2Text;
    var choise3Text = this.data[this.localSituationNumber].choise3Text;
    var choise4Text = this.data[this.localSituationNumber].choise4Text;

    this.choise1LabelArea.text = choise1Text;
    this.choise2LabelArea.text = choise2Text;
    this.choise3LabelArea.text = choise3Text;
    this.choise4LabelArea.text = choise4Text;
  },
  enableChoises:function()
  {
    this.choise1Rect
      .show();
    this.choise2Rect
      .show();
    this.choise3Rect
      .show();
    this.choise4Rect
      .show();

    this.choise1Rect.setInteractive(true);
    this.choise2Rect.setInteractive(true);
    this.choise3Rect.setInteractive(true);
    this.choise4Rect.setInteractive(true);
  },
  disableChoises:function()
  {
    this.choise1Rect.setInteractive(false);
    this.choise2Rect.setInteractive(false);
    this.choise3Rect.setInteractive(false);
    this.choise4Rect.setInteractive(false);

    this.choise1Rect
      .hide();
    this.choise2Rect
      .hide();
    this.choise3Rect
      .hide();
    this.choise4Rect
      .hide();

  },
  showAllText: function(){
      var text = this.texts[this.textIndex];
      this.mainMessageLabelArea.text = text;

      this.textAll = true;
      this.charIndex = text.length;
    },
  clearText:function(){
    this.mainMessageLabelArea.text='';
    this.disableChoises();
  },

  nextText : function(){

    if(this.texts.length <= 1 + this.textIndex){
      this.setChoiseTexts();
      this.enableChoises();
    }
    else
    {
      ++this.textIndex;
      this.clearText();
      this.charIndex = 0;
      this.addChar();
    }
  },
  setText:function(nextLocalSituationNumber)
  {
    this.clearText();
    this.localSituationNumber = nextLocalSituationNumber;
    //なければランダムな変更先にしたい
    if(this.data[this.localSituationNumber] == null)
    {
      var keys = Object.keys(this.data);
      this.localSituationNumber = keys[keys.length * Math.random() << 0];
    }
    /*
    if(this.texts.length <= ++this.localSituationNumber){
      this.localSituationNumber = 0;
    }
    */
    this.texts = this.data[this.localSituationNumber].text.split('#');

    this.setInput();

    console.log(this.texts);
    this.charIndex = 0;
    this.textIndex = 0;
    this.addChar();
  },

  addChar:function(){
    this.mainMessageLabelArea.text += this.getChar();
  },

  getChar:function(){
    var text = this.texts[this.textIndex];
    if(text.length <= this.charIndex){
      this.showAllText();
      return '';
    }else{
      this.textAll = false;
      return text[this.charIndex++];
    }
  },
  setInput:function()
  {
    this.messageIndex.value = this.localSituationNumber;
    this.messageText.value = this.data[this.localSituationNumber].text;
    this.choise1Input.value = this.data[this.localSituationNumber].choise1Text;
    this.choise1NextIndex.value = this.data[this.localSituationNumber].choise1Number;
    this.choise2Input.value = this.data[this.localSituationNumber].choise2Text;
    this.choise2NextIndex.value = this.data[this.localSituationNumber].choise2Number;
    this.choise3Input.value = this.data[this.localSituationNumber].choise3Text;
    this.choise3NextIndex.value = this.data[this.localSituationNumber].choise3Number;
    this.choise4Input.value = this.data[this.localSituationNumber].choise4Text;
    this.choise4NextIndex.value = this.data[this.localSituationNumber].choise4Number;
  }
});

phina.define('Utyuujin', {
  superClass:'DisplayElement',

  init:function(){
    this.superInit();
    this.face = Sprite('face1', 640, 640 * 572 / 541 ).addChildTo(this);
  }
});

phina.main(function(){
  var app = GameApp({
    startLabel:'main',
    assets: ASSETS,
  });


  app.run();

});
