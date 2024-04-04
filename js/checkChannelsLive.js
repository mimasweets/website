
    window.onload = function() {
    // Replace with your Twitch Client ID
        const clientId = 'cv1t246lh2zdc1zq0bc771fdn3bnzr';
        // Replace with your Twitch OAuth token
        const oauthToken = 'ad7dxeilfq0k3wfdvylsxz0e134mqw';

        // List of Twitch channel names to check
        const channels = ['nehaow', 'tophatsss', 'kitxtsuki', 'woobat'];

        // Function to check if a channel is live and fetch profile picture
        function fetchProfileAndCheckStatus(channelName) {
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
                                }
                            }
                        });
                    }
                }
            });
        }

        // Run the check on page load
        $(document).ready(function() {
            channels.forEach(channel => fetchProfileAndCheckStatus(channel));
        });
        }
