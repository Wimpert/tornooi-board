import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { GroupsEditorComponent } from './admin/groups-editor/groups-editor.component';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { GameComponent } from './game/game.component';
import {TournamentService} from "./services/tournament/tournament.service";
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import {RestService} from "./services/rest/rest.service";
import { PouleMatchComponent } from './admin/poule-match/poule-match.component';
import { KnockoutMatchComponent } from './admin/knockout-match/knockout-match.component';
import { KnockoutRoundComponent } from './admin/knockout-round/knockout-round.component';
import { GameSheetComponent } from './admin/game-sheet/game-sheet.component';
import { GroupsDisplayComponent } from './display/groups-display/groups-display.component';
import { RoundsDisplayComponent } from './display/rounds-display/rounds-display.component';
import { GroupBoxComponent } from './display/groups-display/group-box/group-box.component';
import { SettingsComponent } from './settings/settings.component';
import {SettingsService} from "./services/settings/settings.service";
import { PrintComponent } from './admin/print/print.component';
import {PrintService} from "./services/print/print.service";
import {SponsorDisplayComponent} from "./display/sponsor-display/sponsor-display.component";
import { RefsComponent } from './admin/refs/refs.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GroupsEditorComponent,
    GameComponent,
    TournamentListComponent,
    PouleMatchComponent,
    KnockoutMatchComponent,
    KnockoutRoundComponent,
    GameSheetComponent,
    GroupsDisplayComponent,
    RoundsDisplayComponent,
    GroupBoxComponent,
    SettingsComponent,
    PrintComponent,
    SponsorDisplayComponent,
    RefsComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [TournamentService, RestService, SettingsService, PrintService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
