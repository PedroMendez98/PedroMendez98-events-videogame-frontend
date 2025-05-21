import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  eventForm!: FormGroup;
  submitted = false;
  isEdit = false;
  eventId!: number;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      game: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      maxPlayers: [1, [Validators.required, Validators.min(1)]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.eventId = +id;
        this.eventService.getEventById(this.eventId).subscribe(e => {
          this.eventForm.patchValue({
            name: e.name,
            game: e.game,
            location: e.location,
            date: e.date,
            maxPlayers: e.maxPlayers
          });
        });
      }
    });
  }

  get f() { return this.eventForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.eventForm.invalid) return;
    const payload = this.eventForm.value;
    if (this.isEdit) {
      this.eventService.updateEvent(this.eventId, payload).subscribe(() => this.goBack());
    } else {
      this.eventService.createEvent(payload).subscribe(() => this.goBack());
    }
  }

  goBack() {
    this.router.navigate(['/admin/events']);
  }
}