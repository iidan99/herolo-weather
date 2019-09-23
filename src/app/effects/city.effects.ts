import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { SearchServiceService } from '../services/search-service.service';