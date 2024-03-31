
window.onload = function() {
    // Replace with your Twitch Client ID
        const clientId = 'cv1t246lh2zdc1zq0bc771fdn3bnzr';
        // Replace with your Twitch OAuth token
        const oauthToken = 'ad7dxeilfq0k3wfdvylsxz0e134mqw';

        // List of Twitch channel names to check
        const channels = ['sapphicsusan', 'mimasweets', 'tophatsss'];

        // Function to check if a channel is live
        function checkChannelStatus(channelName) {
            $.ajax({
                url: `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
                headers: {
                    'Client-ID': clientId,
                    'Authorization': `Bearer ${oauthToken}`
                },
                success: function(data) {
                    if (data.data.length > 0) {
                        // Channel is live, update the div class
                        $(`#${channelName}`).addClass('live');
                    }
                }
            });
        }

        // Run the check on page load
        $(document).ready(function() {
            channels.forEach(channel => checkChannelStatus(channel));
        });
    }