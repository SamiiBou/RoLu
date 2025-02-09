//
//  CustomView5.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView5: View {
    @State public var text3Text: String = "9:41"
    var body: some View {
        ZStack(alignment: .topLeading) {
                HStack {
                    Spacer()
                        Text(text3Text)
                            .foregroundColor(Color(red: 0.15, green: 0.15, blue: 0.16, opacity: 1.00))
                            .font(.custom("SFUIText-Regular", size: 15))
                            .lineLimit(1)
                            .padding(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: -0.784))
                            .frame(alignment: .center)
                            .multilineTextAlignment(.center)
                    Spacer()
                }
        }
        .frame(width: 64.656, height: 18, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView5_Previews: PreviewProvider {
    static var previews: some View {
        CustomView5()
    }
}
