import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ContentComponent } from './content/content.component'
import { SupportComponent } from './content/support/support.component';
import { SimulationComponent } from './content/simulation/simulation.component';
import { ErgebnisseComponent } from './content/ergebnisse/ergebnisse.component';
import { AbsatzplanungComponent } from './content/absatzplanung/absatzplanung.component';
import { ProgrammplanungComponent } from './content/pp/programmplanung.component';
import { KapazitaetsplanungComponent } from './content/kap/kapazitaetsplanung.component';
import { MengenplanungComponent } from './content/mp/mengenplanung.component';
import { LosgroessensplittingComponent } from './content/lg/losgroessensplitting.component';

const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'ergebnisse', component: ErgebnisseComponent },
  { path: 'support', component: SupportComponent },
  { path: 'absatzplanung', component: AbsatzplanungComponent },
  { path: 'programmplanung', component: ProgrammplanungComponent },
  { path: 'kapazitaetsplanung', component: KapazitaetsplanungComponent },
  { path: 'mengenplanung', component: MengenplanungComponent },
  { path: 'losgroessensplitting', component: LosgroessensplittingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
