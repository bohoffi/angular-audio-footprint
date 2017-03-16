import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as D3 from 'd3';

export interface ChartOpts {
  cellWidth: number;
  cellHeight: number;
  cellX: number;
  cellY: number;
}

const _defaultOpts: ChartOpts = {
  cellHeight: 5,
  cellWidth: 5,
  cellX: 5,
  cellY: 5
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  private _data: Array<Array<number>> = [];

  private _opts: ChartOpts;

  private _rThreshold: number = 85;
  private _gThreshold: number = 170;

  setOpts(opts: ChartOpts): void {
    this._opts = opts || _defaultOpts;
  }

  update(data: Array<Array<number>>): void {

    let self = this;
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
            return j * self._opts.cellX;
          })
          .attr('y', function (d, i, j) {
            return index * self._opts.cellY;
          })
          .attr('width', function () {
            return self._opts.cellWidth;
          })
          .attr('height', function () {
            return self._opts.cellHeight;
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
