import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as D3 from 'd3';

import { defaultChartOpts } from '../util/consts';
import { ChartOpts } from '../util/interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  opts: ChartOpts;

  @Input()
  svgWidth = 0;
  @Input()
  svgHeight = 0;
  @ViewChild('svg')
  svg: ElementRef;

  private _data: Array<Array<number>> = [];

  private _rThreshold = 85;
  private _gThreshold = 170;

  constructor() {
    this.opts = defaultChartOpts;
  }

  setOpts(opts: ChartOpts): void {
    this.opts = opts || defaultChartOpts;
  }

  update(data: Array<Array<number>>): void {

    const self = this;
    this._data = data;
    const svg = D3.select('#svg');

    /**
     * Adds a vector group for each row
     */
    svg.selectAll('g')
      .data(this._data)
      .enter()
      .append('g')

      /**
       * Adds rects for each child per row
       */
      .each(function (row, index) {
        D3.select(this)
          .selectAll('rect')
          .data(row.filter(value => value > 0))
          .enter()
          .append('rect')
          .attr('x', function (d, j) {
            return j * self.opts.cellX;
          })
          .attr('y', function (d, i, j) {
            return index * self.opts.cellY;
          })
          .attr('width', function () {
            return self.opts.cellWidth;
          })
          .attr('height', function () {
            return self.opts.cellHeight;
          })
          .attr('fill', function (d, j) {

            if (d <= self._rThreshold) {
              return `rgb(${d},${Math.round(d / 2)},${Math.round(d / 2)})`;
            } else if (d <= self._gThreshold) {
              return `rgb(${Math.round(d / 2)},${d},${Math.round(d / 2)})`;
            } else {
              return `rgb(${Math.round(d / 2)},${Math.round(d / 2)},${d})`;
            }
          });
      });
  }

  reset(): void {
    D3.selectAll('#svg > *').remove();
  }
}
