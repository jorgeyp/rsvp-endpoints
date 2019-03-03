var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

// api_version:    // 2
var rsvpSchema = new Schema({
    event: { // Event for the RSVP
        api_version: String, // 2
        event_id: String, // Unique alphanumeric identifier
        event_name: String, // Name of the event
        event_url: String, // URL to the full event page
        time: Date, // Event time if set in milliseconds since the epoch
    },
    group: { // Group hosting the event
        group_city: String, // Group's home city
        group_country: String, // two-letter code of group's home country
        group_id: Number, // Numeric identifier of the group
        group_lat: Number, // Latitude of group's approximate location
        group_lon: Number, // Longitude of group's approximate location
        group_name: String, // -
        group_state: String, // two-letter code of group's home state, if in US or CA
        group_topics: [{ // Topics associated with this group
            topic_name: String, // Longer name
            urlkey: String, // Unique keyword
        }],
        group_urlname: String, // Unique portion of group's URL, no slashes
    },
    guests: Number, // Number of guests the member is bringing
    member: {    // Member who RSVP'd
        member_id: Number, // Unique numeric id
        member_name: String, // Full name given
        other_services: Schema.Types.Mixed, // e.g. {"twitter": {"identifier": "MeetupAPI"}}
        photo: String, // Thumbnail URL for member photo if one exists
    },
    mtime: Number, // Last modified time of this RSVP, in milliseconds since the epoch
    response: String, // "yes" or "no"
    rsvp_id: Number, // Unique numeric identifier
    venue: { // Venue, if public
        lat: Number, // Latitude of the venue
        lon: Number, // Longitude of the venue
        venue_id: Number, // Unique numeric identifier
        venue_name: String, // -
    },
    group_location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, {collection: 'rsvp'});

module.exports = mongoose.model("Rsvp", rsvpSchema);