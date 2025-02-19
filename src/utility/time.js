const { addHours, lightFormat } = require("date-fns");

class Time {
  static UTC(offset = 0) {
    return addHours(new Date(), offset).toUTCString();
  }

  static UTCDestructured(offset = 0) {
    const utc = this.UTC(offset);
    const utcArray = utc.split(" ");

    return {
      day: utcArray[1],
      month: this.monthFormat(utcArray[2]),
      year: utcArray[3],
      time: utcArray[4].slice(0, 5),
    };
  }

  static monthFormat(month) {
    switch (month) {
      case "Jan":
        return "01";
      case "Feb":
        return "02";
      case "Mar":
        return "03";
      case "Apr":
        return "04";
      case "May":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Aug":
        return "08";
      case "Sep":
        return "09";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
      default:
        return "Invalid month";
    }
  }

  static monthFormatToWord(month) {
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return null; // Or you can return a default value like "Invalid month" if needed
    }
  }

  static formatDayOfWeek(day) {
    const dayOfWeek = new Date(day).getDay(); // Using getDay() method on the date object

    switch (dayOfWeek) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return ""; // Default case to handle any invalid input
    }
  }

  static formatDayOfWeekLong(day) {
    const dayOfWeek = new Date(day).getDay(); // Using getDay() method on the date object

    switch (dayOfWeek) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return ""; // Default case to handle any invalid input
    }
  }

  static timeFormat(time) {
    return lightFormat(new Date(`2000-01-01T${time}`), "h:mma");
  }

  static timeFormatSmall(time) {
    return lightFormat(new Date(`2000-01-01T${time}`), "ha");
  }
}

module.exports = Time;
