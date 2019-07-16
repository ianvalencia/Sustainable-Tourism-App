import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  booking;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private bookingsService: BookingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/app/tabs/bookings');
      }
      this.booking = this.bookingsService.getBooking(paramMap.get('id'));

    });
  }

  onSeeMore() {
    this.router.navigate(['/activity-details', this.booking.aid ])
  }
}
