/**
 * @author sigmus@gmail.com
 * 
 */
var eDate =  {

	units: {
		minute: 60000,
		hour: 3600000,
		day : 86400000
	},
	
	clone: function (date) {
		return new Date(date);
	},
	
	getInput: function (i) {
		var s;
		if (i['dd/mm/yyyy']) {
			s = i['dd/mm/yyyy'].split('/');
			i.day = s[0]; 
			i.month = s[1]; 
			i.year = s[2];
		}
		if (i['mm/dd/yyyy']) {
			s = i['mm/dd/yyyy'].split('/');
			i.month = s[0];
			i.day = s[1]; 
			i.year = s[2];
		}
		if (i['yyyy/mm/dd']) {
			s = i['mm/dd/yyyy'].split('/');
			i.year = s[0];
			i.month = s[1];
			i.day = s[2]; 
		}		
		return {
			day: parseInt(i.day, 10),
			month: parseInt(i.month, 10) - 1,
			year: parseInt(i.year, 10)
		};
	},
	
	isValid: function (i) {
		var 
		fi = this.getInput(i),
		testDate = new Date(fi.year, fi.month, fi.day),
		testDateString = 
			testDate.getFullYear().toString() + 
			testDate.getMonth().toString() + 
			testDate.getDate().toString(),
		inputString =
			fi.year.toString() + 
			fi.month.toString() + 
			fi.day.toString();

		return (testDateString === inputString);	
	},
	
	getNew: function (i) {
		var fi = this.getInput(i);
		return new Date(fi.year, fi.month, fi.day);
	},

	zeroDay: function (date) {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	},	
	
	getToday: function () {
		return this.zeroDay(new Date());
	},
	
	add: function (i) {
		i.date.setTime(
			i.date.getTime() + 
			(parseInt(i.value, 10) * 
			this.units[i.unit]) 
		);
	},
	
	addDays: function (date, value) {
		this.add({
			'date': date,
			'unit': 'day',
			'value': value 
		});
	},

	diffDays: function (date1, date2) {
		var
		cdate1 = this.zeroDay(this.clone(date1)),
		cdate2 = this.zeroDay(this.clone(date2)),
		diff = cdate1.getTime() - cdate2.getTime();
		if (diff === 0) {
			return 0;	
		}
		return Math.round(diff / this.units.day);				
	},
	
	isOverAge: function (date, age) {
		c = this.getToday();
		c.setDate(date.getDate());
		c.setMonth(date.getMonth());
		c.setFullYear(date.getFullYear() + age);
		if (this.getToday().getTime() < c.getTime()) {
			return false;
		}
		return true;
	}
	
};
