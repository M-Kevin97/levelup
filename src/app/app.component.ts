import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'levelup';

  constructor(){

    this.firebaseConfiguration();
  }

  private firebaseConfiguration(){
  
    // Your web app's Firebase configuration
    const firebaseConfigLevelUp = {
      apiKey: "AIzaSyB32vh3iq9nJyWJiEFwoxXhyX48_NqsWQU",
      authDomain: "levelup-78020.firebaseapp.com",
      databaseURL: "https://levelup-78020.firebaseio.com",
      projectId: "levelup-78020",
      storageBucket: "levelup-78020.appspot.com",
      messagingSenderId: "824603720072",
      appId: "1:824603720072:web:44d14809a0ef48dbc3223d",
      measurementId: "G-SK0CD1MR78"
    };
    const firebaseConfigNetwork = {
      apiKey: "AIzaSyDkDnIA6BAD2rW8NVBDXtSaA87OUDBUl7s",
      authDomain: "network-55b29.firebaseapp.com",
      databaseURL: "https://network-55b29.firebaseio.com",
      projectId: "network-55b29",
      storageBucket: "network-55b29.appspot.com",
      messagingSenderId: "156096192940",
      appId: "1:156096192940:web:aa59dea901f2da043c5a09"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfigNetwork);

    //firebase.analytics();
  }
}
