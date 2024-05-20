
    window.onload = function() {
    // Replace with your Twitch Client ID
        const clientId = 'cv1t246lh2zdc1zq0bc771fdn3bnzr';
        // Replace with your Twitch OAuth token
        const oauthToken = 'ad7dxeilfq0k3wfdvylsxz0e134mqw';

        // List of Twitch channel names to check
        const channels = ['mimasweets', 'kitxtsuki', 'miiraculoussushii', 'woobat', 'salemba_', 'sir_xurr'];

       
    function fetchProfileAndCheckStatus(channelName, bannerId) {
        $.ajax({
            url: `https://api.twitch.tv/helix/users?login=${channelName}`,
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${oauthToken}`
            },
            success: function(userData) {
                if (userData.data.length > 0) {
                    // Fetch the user's profile picture
                    const profileImageUrl = userData.data[0].profile_image_url;
                    $(`#${channelName}`).prepend(`<img class="thumbnail" src="${profileImageUrl}" alt="${channelName}'s profile picture">`);
    
                    // Check if the channel is live
                    $.ajax({
                        url: `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
                        headers: {
                            'Client-ID': clientId,
                            'Authorization': `Bearer ${oauthToken}`
                        },
                        success: function(streamData) {
                            if (streamData.data.length > 0) {
                                // Channel is live, change the div class
                                $(`#${channelName}`).removeClass('offline').addClass('live');
                                // Ensure bannerId is correctly passed and used here
                                $(`#${bannerId}`).removeClass('offlinebanner').addClass('livebanner');
                            }
                        }
                    });
                }
            }
        });
    }
    
    // Ensure bannerId is correctly passed when calling fetchProfileAndCheckStatus
    $(document).ready(function() {
        channels.forEach((channel, index) => {
            const bannerId = `offlinebanner${index + 1}`;
            fetchProfileAndCheckStatus(channel, bannerId);
        });
    });
}