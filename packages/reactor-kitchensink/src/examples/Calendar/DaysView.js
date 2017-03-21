import React, { Component } from 'react';
import { Calendar_Day, Panel } from '@extjs/reactor/modern';
import './data';

export default class CalendarDayViewExample extends Component {
    constructor() {
        super();
    }

    store = Ext.create('Ext.calendar.store.Calendars', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/CalendarDays'
        }
    })

    render() {
        return (
            <Panel
                title={Ext.Date.format(new Date(), 'F Y')}
                layout={{
                    type: 'hbox',
                    align: 'stretch'
                }}
                header={{
                    titleAlign: 'center'
                }}
            >
                <Panel
                    title={'Calendars'}
                    ui={'light'}
                    width={150}
                    bodyPadding={5}
                    hidden={Ext.os.is.Phone}
                    items={[{
                        xtype: 'calendar-list',
                        store: this.store
                    }]}
                />
                <Calendar_Day
                    store={this.store}
                    flex={1}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    value={new Date()}
                    startTime={8}
                    endTime={20}
                    visibleDays={2}
                />
            </Panel >
        )
    }
}