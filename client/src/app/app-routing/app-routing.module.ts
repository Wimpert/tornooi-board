import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "../admin/admin.component";
import {TournamentListComponent} from "../tournament-list/tournament-list.component";
import {GameSheetComponent} from "../admin/game-sheet/game-sheet.component";
import {RoundsDisplayComponent} from "../display/rounds-display/rounds-display.component";
import {GroupsDisplayComponent} from "../display/groups-display/groups-display.component";
import {SettingsComponent} from "../settings/settings.component";
import {PrintComponent} from "../admin/print/print.component";
import {RefsComponent} from "../admin/refs/refs.component";
import {OverviewComponent} from "../display/overview/overview.component";


const routes: Routes = [
  { path: 'admin/:id',  component: AdminComponent},
  { path: 'all',  component: TournamentListComponent},
  { path: 'admin',  component: AdminComponent},
  { path: 'overview/:tid',  component: OverviewComponent },
  { path: 'sheet',  component: GameSheetComponent},
  { path: 'rounds/:tid',  component: RoundsDisplayComponent},
  { path: 'groups/:tid/:gid',  component: GroupsDisplayComponent},
  { path: 'print/:tid',  component: PrintComponent},
  { path: 'refs/:tid',  component: RefsComponent},
  { path: 'settings',  component: SettingsComponent},
  { path:'**', redirectTo: 'all', pathMatch: 'full'}
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
