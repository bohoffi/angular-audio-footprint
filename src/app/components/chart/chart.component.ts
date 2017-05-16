import {Component, ElementRef, Input, ViewChild} from '@angular/core';

import * as D3 from 'd3';

import {defaultChartOpts} from '../../util/consts';
import {ChartOpts} from '../../util/interfaces';

export interface ArcDataObject {
  start: number;
  startAngle: number;
  endAngle: number;
}

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

  private _data: Array<ArcDataObject> = [];

  constructor() {
    this.opts = defaultChartOpts;
  }

  setOpts(opts: ChartOpts): void {
    this.opts = opts || defaultChartOpts;
  }

  update(data: Array<ArcDataObject>): void {

    this._data = data;
    this._renderArcLike();
  }

  private _renderArcLike(): void {

    const svg = D3.select('#svg');
    const container = svg.append('g');
    const arc = D3.arc();

    const maxRadius = (this._data[this._data.length -1].start * 2) + 2;
    this.svgWidth = maxRadius * 2;
    this.svgHeight = maxRadius * 2;

    const zoom = D3.zoom().scaleExtent([0, 10]).on('zoom', function(){
      container.attr('transform', `translate(${D3.event.transform.x},${D3.event.transform.y})scale(${D3.event.transform.k})`)
    });
    svg.call(zoom);

    container.selectAll('path')
      .data(this._data as Array<any>)
      .enter()
      .append('path')
      .attr('transform', `translate(${maxRadius},${maxRadius})`)
      .style('fill-opacity', 0)
      .attr('d', function(d) {
        return arc.innerRadius(10).outerRadius(15)
          .startAngle(d.startAngle)
          .endAngle(d.endAngle)(d);
      })
      .transition()
      .duration(400)
      .attr('d', function(d) {
        return arc.innerRadius(d.start * 2).outerRadius((d.start * 2) + 2)
          .startAngle(d.startAngle)
          .endAngle(d.endAngle)(d);
      })
      .attr('transform', `translate(${maxRadius},${maxRadius})`)
      .style('fill', '#0d47a1')
      .style('fill-opacity', 1);
  }

  reset(): void {
    D3.selectAll('#svg > *').remove();
  }
}